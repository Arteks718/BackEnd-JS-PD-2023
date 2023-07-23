module.exports.tasksController = {
  getAllTask:async (req, res) => {},
  getTaskById:async (req, res) => {
    res.status(200).send(req.params.taskId)
  },
  createTask:async (req, res) => {},
  updateTaskById:async (req, res) => {},
  deleteTaskById:async (req, res) => {},
}