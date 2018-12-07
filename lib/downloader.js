import multiDownload from 'multi-download'
import saveAs from 'file-saver'
import path from 'path-browserify'

import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'

import Promise from 'bluebird'
import _ from 'lodash'

// SEE: https://stuk.github.io/jszip/documentation/examples/downloader.html
/**
 * Fetch the content and return the associated promise.
 * @param {String} url the url of the content to fetch.
 * @return {Promise} the promise containing the data.
 */
const urlToPromise = (url) => {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

// Download separately
const download = (files = []) => {
  if (!_.isArray(files)) {
    files = [files]
  }
  multiDownload(files)
}

// Zip and download.
const zip = async (files = [], name = 'default.zip') => {
  if (!JSZip.support.blob) throw new Error('Blob is not supported by this browser :(')

  if (!_.isArray(files)) {
    files = [files]
  }

  const zip = new JSZip()

  // Fetch files from remotes and map as Object.
  const fetched = await Promise.map(files, (file) => urlToPromise(file))
    .then((fetched) => {
      // Extract basename from filename.
      const fileNames = _.map(files, (file) => path.basename(file))
      return _.zipObject(fileNames, fetched)
    })

  // Inject files to zip.
  _.each(fetched, (data, file) => zip.file(file, data, { binary: true }))

  // Generate and return zip blob.
  return zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, name)
  })
}

export {
  download,
  zip
}

export default {
  download,
  zip
}