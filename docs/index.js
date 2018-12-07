import $ from 'jquery'
import _ from 'lodash'

import downloader from '../lib/downloader'

const publicUrl = location.pathname || '/'
// SEE: https://stackoverflow.com/a/22242528/9998350
const isIE = (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1)

let FILES = [
  publicUrl + 'images/100.jpeg',
  publicUrl + 'images/200.jpeg',
  publicUrl + 'images/300.jpeg'
]

// Because IE11 cannot force-download images(.jpeg)
if (isIE) {
  FILES = [
    publicUrl + 'zips/100.zip',
    publicUrl + 'zips/200.zip',
    publicUrl + 'zips/300.zip',
  ]
}

$(() => {
  const $button = $('#download-single')
  const $dsButton = $('#download-separately')
  const $dzButton = $('#download-zip')

  $button.on('click', () => downloader.download(_.first(FILES)))
  $dsButton.on('click', () => downloader.download(FILES))
  $dzButton.on('click', () => downloader.zip(FILES, 'images.zip'))
})