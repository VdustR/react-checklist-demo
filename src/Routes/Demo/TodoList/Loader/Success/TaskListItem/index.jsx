import util from 'util';
import format from 'date-fns/format';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Task from 'Src/Model/Task';
import urlUtility from 'Src/Utilities/urlUtility';
import style from './style.less';

class TaskListItem extends Component {
  static propTypes = {
    query: () => {},
    task: (props, propName, componentName) => {
      const prop = props[propName];
      if (!(prop instanceof Task)) {
        throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed. prop: ${util.inspect(prop)}`);
      }
    },
  }
  static defaultProps = {
    query: {},
    task: null,
  }
  constructor(props) {
    super(props);
    const {
      task,
    } = props;
    this.state = {
      editing: false,
      editingContent: task.content,
    };
  }
  get changed() {
    const { editingContent } = this.state;
    const { task } = this.props;
    return editingContent !== task.content;
  }
  focus = () => {
    this.setState({ editing: true });
  }
  cancelEditing = () => {
    const {
      task,
    } = this.props;
    this.setState({
      editing: false,
      editingContent: task.content,
    });
  }
  contentChangeHandler = event => this.setState({ editingContent: event.target.value.replace(/^\s+/, '') })
  contentBlurHandler = () => {
    if (!this.changed) {
      this.cancelEditing();
    }
  }
  update = () => {
    console.log('updating', this.state.editingContent);
  }
  render() {
    const {
      editing,
      editingContent,
    } = this.state;
    const {
      task,
      query,
    } = this.props;
    const {
      orderBy,
    } = query;
    const {
      content,
      checked,
      createdTime,
      updatedTime,
    } = task;
    const orderedByCreatedTime = orderBy === 'createdTime';
    const time = format(orderedByCreatedTime ? createdTime : updatedTime, 'YYYY-MM-dd kk:mm:ss');
    return (
      <div className={classnames(style['task-list'], editing && style.editing)}>
        <Checkbox checked={checked} />
        {
          editing ? (
            /* eslint-disable jsx-a11y/no-autofocus */
            <input
              className={style.content}
              value={editingContent}
              onChange={this.contentChangeHandler}
              onBlur={this.contentBlurHandler}
              autoFocus
            />
            /* eslint-enable */
          ) : (
            <div
              className={style.content}
              onClick={this.focus}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              {content}
            </div>
          )
        }
        <div className={style.actions}>
          {
            editing ? (
              <Fragment>
                {
                  this.changed && (
                    <IconButton onClick={this.update}>
                      <SaveIcon />
                    </IconButton>
                  )
                }
                <IconButton onClick={this.cancelEditing}>
                  <ClearIcon />
                </IconButton>
              </Fragment>
            ) : (
              <IconButton>
                <DeleteForeverIcon />
              </IconButton>
            )
          }
        </div>
        <div className={style.time}>{time}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.router.location;
  const query = urlUtility.searchStrToObj(search);

  return {
    query,
  };
};

export default connect(mapStateToProps)(TaskListItem);
