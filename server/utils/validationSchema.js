const yup = require('yup')

module.exports.CREATE_NEW_TASK = yup.object({
  body: yup.string().required().min(4).max(500).trim(),
  isDone: yup.boolean(),
  topicId: yup.number().required().positive().integer(),
  deadline: yup.date().required().min(new Date().toISOString())
})