import multiDownload from 'multi-download'
import saveAs from 'file-saver'

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
  if (!_.isArray(files)) {
    files = [files]
  }

  const zip = new JSZip()

  // Fetch files from remotes and map as Object.
  const fetched = await Promise.map(files, (file) => urlToPromise(file))
    .then((fetched) => _.zipObject(files, fetched))

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