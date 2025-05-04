export const checkPost = data => {
    const {content} = data;
    return content.toString().length <= 5;
};

export const newPassword = (data) => {
  const { password } = data
  
}
