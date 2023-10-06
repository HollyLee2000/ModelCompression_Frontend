export const setIsDialogOpen = function (state, is_dialog_open) {
  state.is_dialog_open = is_dialog_open
}

export const setDialogContent = function (state, dialog_content) {
  state.dialog_content = dialog_content
}

export const closeDialog = function (event) {
  console.log(event)
  this.setIsDialogOpen(false)
  this.setDialogContent('')
}
