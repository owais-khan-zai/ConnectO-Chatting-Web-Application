export const responseErrorHandler = (
  res,
  status = 500,
  success = false,
  message = "Something went wrong",
) => {
  return res.status(status).json({
    success,
    status,
    message,
  });
};



export const responseHandler = (res, status=200, success=true, message='', data=null) =>{
  const response = { success, message }

  if(data) {
    response.data = data
  }
  return res.status(status).json(response)
}