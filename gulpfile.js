const { src, dest, watch, series } = require('gulp')
// sass fonksiyonu, gulp-sass'ın dart sass'ı argüman olarak aldığı fonksiyondan dönen değer oluyor.
const sass = require('gulp-sass')(require('sass'))
// npm i gulp-purgecss diyerek gulp'a özel purge css'i indiriyoruz.
const purgecss = require('gulp-purgecss')

// index.scss'si render'la(sass()) ve css klasörünün içine yerleştir(dest('css')).
function buildStyles() {
  //scss'in içindeki bütün subfolder'ları ve onların içindeki bütün scss dosyalarını izle. Sadece index.scss'i izlersek yan modüllerde yapılan değişikliklerde oto render triggerlanmıyor.
  // direk o directory'deki scss doyaları da izleniyor index.scss gibi.
  return (
    src('scss/**/*.scss')
      // .pipe(sass())
      .pipe(sass({ outputStyle: 'compressed' }))
      // scss dosyaları css'e dönüştürüldükten sonra belirtilen noktası html dosyalarına göre purge'ü gerçekleştir.
      // .pipe(purgecss({ content: ['*.html'] }))
      .pipe(dest('css'))
  )
}

//belirtilen directory'deki bütün scss ve html dosyalarını izle ve her değişiklikte buildStyles fonksiyonunu çalıştır.
// Purgecss'i kullandığımız için html'deki değişiklikleri de izlememiz gerekiyor.
function watchTask() {
  watch(['scss/**/*.scss', '*.html'], buildStyles)
}

// gulp tarafından görülmeleri için export'lamamız gerekiyor, sonrasında terminale gulp yazmamız yeterli.
exports.default = series(buildStyles, watchTask)
