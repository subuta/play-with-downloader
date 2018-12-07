import $ from 'jquery'
import _ from 'lodash'

import downloader from '../lib/downloader'

const publicUrl = location.pathname || '/'

// SEE: https://stackoverflow.com/a/22242528/9998350
const isIE = _.isEmpty(location.search) && (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1)

// Defaults to jpeg.
let files = [
  publicUrl + 'images/100.jpeg',
  publicUrl + 'images/200.jpeg',
  publicUrl + 'images/300.jpeg'
]
let type = 'jpeg'

// Because IE11 cannot force-download of images without content-disposition=attachment header.
if (_.includes(location.search, 'zip') || isIE) {
  files = [
    publicUrl + 'zips/100.zip',
    publicUrl + 'zips/200.zip',
    publicUrl + 'zips/300.zip',
  ]
  type = 'zip'
// Force pdf download if pdf query specified.
} else if (_.includes(location.search, 'pdf')) {
  files = [
    publicUrl + 'pdfs/100.pdf',
    publicUrl + 'pdfs/200.pdf',
    publicUrl + 'pdfs/300.pdf',
  ]
  type = 'pdf'
}

$(() => {
  const $button = $('#download-single')
  const $daButton = $('#download-all')
  const $dzButton = $('#download-zip')

  $button.text(`Download single ${type} file`)
  $daButton.text(`Download all ${type} files`)
  $dzButton.text(`Compress and Download ${type} as ZIP`)

  $button.on('click', () => downloader.download(_.first(files)))
  $daButton.on('click', () => downloader.download(files))
  $dzButton.on('click', () => downloader.zip(files, `${type}.zip`))
})