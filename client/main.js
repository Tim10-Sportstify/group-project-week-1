function generateRandomAvatar(name) {
  const randomAvatar = `https://ui-avatars.com/api/?rounded=true&background=random&name=${name}`
  $('#userAva').attr('src', randomAvatar)
}
