import $ from 'jquery'
import _ from 'lodash'

import downloader from '../lib/downloader'

const publicUrl = location.pathname || '/'

const FILES = [
  publicUrl + 'images/100.jpeg',
  publicUrl + 'images/200.jpeg',
  publicUrl + 'images/300.jpeg'
]

$(() => {
  const $button = $('#download-single')
  const $dsButton = $('#download-separately')
  const $dzButton = $('#download-zip')

  $button.on('click', () => downloader.download(_.first(FILES)))
  $dsButton.on('click', () => downloader.download(FILES))
  $dzButton.on('click', () => downloader.zip(FILES, 'images.zip'))
})