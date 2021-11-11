import comments from './comments.js'

// Navbar Toggle
const navToggle = document.querySelector('.nav-toggle')
const navList = document.querySelector('.nav-list')

navToggle.addEventListener('click', () => {
  navList.classList.toggle('open')
})

// Navbar Fixed
const navbar = document.querySelector('.nav')

window.addEventListener('scroll', () => {
  // const navbarHeight = navbar.getBoundingClientRect().height
  const scrollHeight = window.scrollY

  if (scrollHeight > 100) {
    navbar.classList.add('fixed')
  } else {
    navbar.classList.remove('fixed')
  }
})

const scrollLinks = document.querySelectorAll('.nav-list a')
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1)
    const element = document.getElementById(id)

    const navHeight = navbar.getBoundingClientRect().height
    const navListHeight = navList.getBoundingClientRect().height
    const isOpen = document.querySelector('.nav-list.open')
    const isFixed = navbar.classList.contains('fixed')
    let position = element.offsetTop - navHeight

    if (!isFixed) {
      position = position - navHeight
    }

    if (isOpen) {
      position = position + navListHeight
    }

    window.scrollTo({
      left: 0,
      top: position,
    })
    // close
    navList.classList.remove('open')
  })
})

// Placing Comments
const commentsCenter = document.querySelector('.comments-center')

// Event listener for each comment
const commentEventListener = (comment) => {
  return comment.addEventListener('click', (e) => {
    if (e.target.classList.contains('comment-edit-icon')) {
      const textArea = comment.querySelector('.single-comment-text')
      const isEditable = textArea.getAttribute('contenteditable')
      if (isEditable === 'false' || isEditable === null) {
        // console.log(isEditable)
        textArea.setAttribute('contenteditable', true)
        textArea.classList.add('editable')
      } else {
        textArea.setAttribute('contenteditable', false)
        textArea.classList.remove('editable')
      }
    }

    if (e.target.classList.contains('comment-delete-icon')) {
      comment.classList.add('deleted')
      setTimeout(() => {
        commentsCenter.removeChild(comment)
      }, 300)
    }
  })
}

window.addEventListener('load', () => {
  commentsCenter.innerHTML = comments
    .map((comment) => {
      const { id, img, name, text, time } = comment
      return `<article data-id=${id} class="single-comment">
          <img src=${img} alt="user" />
          <div>
            <h4>${name}</h4>
            <div class="single-comment-middle">
              <p class="date" contenteditable="false">${time}</p>
              <div class="single-comment-func">
                <i class="fas fa-pencil-alt comment-edit-icon"></i>
                <i class="fas fa-trash comment-delete-icon"></i>
              </div>
            </div>
            <p class="single-comment-text">
              ${text}
            </p>
          </div>
        </article>`
    })
    .join('')

  // Comments Functionality
  const singleComments = document.querySelectorAll('.single-comment')

  singleComments.forEach((comment) => {
    commentEventListener(comment)
  })
})

// Adding Comments
const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

const commentAddBtn = document.querySelector('.comments-add button')
const commentTextarea = document.querySelector('.comments-add textarea')

commentAddBtn.addEventListener('click', (e) => {
  const text = commentTextarea.value
  if (text) {
    e.preventDefault()
    const date = new Date()
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const fullDate = `${day} ${month} ${year}`

    commentsCenter.insertAdjacentHTML(
      'afterbegin',
      `<article data-id="0" class="single-comment o-none">
          <img style="width: 64px; height: 64px;" src="./images/comment-userself.jpg" alt="user" />
          <div>
            <h4>Admin</h4>
            <div class="single-comment-middle">
              <p class="date" contenteditable="false">${fullDate}</p>
              <div class="single-comment-func">
                <i class="fas fa-pencil-alt comment-edit-icon"></i>
                <i class="fas fa-trash comment-delete-icon"></i>
              </div>
            </div>
            <p class="single-comment-text">
              ${text}
            </p>
          </div>
        </article>`
    )

    commentTextarea.value = ''

    const addedComment = document.querySelector('.single-comment.o-none')
    // making transition possible
    setTimeout(() => {
      addedComment.classList.remove('o-none')
      commentEventListener(addedComment)
    }, 150)
  }
})
