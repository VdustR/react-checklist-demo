import apiUtility from 'Src/Utilities/apiUtility';

const { api } = apiUtility;

class Task {
  static query = async (params) => {
    let res = await api({
      method: 'get',
      url: 'tasks',
      params,
    });

    if (res && res.result) {
      res = {
        ...res,
        result: res.result.map(raw => new Task(raw)),
      };
    }

    return res;
  };

  constructor({
    id,
    content,
    checked,
    createdTime,
    updatedTime,
  }) {
    this.id = id;
    this.content = content;
    this.checked = checked;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
  }
}

export default Task;
