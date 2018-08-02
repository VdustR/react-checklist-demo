import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DetailsIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Task from 'Src/Model/Task';
import Time from './Time';
import style from './style.less';

class TaskListItem extends Component {
  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    check: PropTypes.func.isRequired,
    unCheck: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    const {
      task,
    } = props;
    this.state = {
      editing: false,
      editingContent: task.content,
      expanded: false,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.calculateHeight);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expanded !== this.state.expanded) {
      this.calculateHeight();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateHeight);
  }
  get changed() {
    const { editingContent } = this.state;
    const { task } = this.props;
    return editingContent !== task.content;
  }
  contentRef = React.createRef()
  calculateHeight = () => {
    const {
      expanded,
    } = this.state;
    let height = null;
    if (expanded) {
      const contentDom = this.contentRef.current;
      height = contentDom.scrollHeight;
    }
    this.setState({ height });
  }
  focus = () => {
    const {
      task,
    } = this.props;
    this.setState({
      editing: true,
      expanded: false,
      editingContent: task.content,
    });
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
  collapse = () => {
    this.setState({
      expanded: false,
    });
  }
  toggleExpanded = () => {
    const { expanded } = this.state;
    const next = !expanded;
    this.setState({
      expanded: next,
    });
  }
  check = () => {
    const {
      task,
      check,
      unCheck,
    } = this.props;
    const {
      checked,
    } = task;
    if (checked) {
      unCheck({ task });
    } else {
      check({ task });
    }
  }
  update = () => {
    const {
      editingContent,
    } = this.state;
    const {
      task,
      update,
    } = this.props;
    update({ task, content: editingContent });
  }
  remove = () => {
    const {
      task,
      remove,
    } = this.props;
    remove({ task });
  }
  render() {
    const {
      editing,
      editingContent,
      expanded,
      height,
    } = this.state;
    const {
      task,
    } = this.props;
    const {
      content,
      checked,
    } = task;
    const taskListClassName = classnames(
      style['task-list'],
      editing && style.editing,
      expanded && style.expanded,
    );
    return (
      <div className={taskListClassName} style={{ height }}>
        <div className={style.inner} ref={this.contentRef}>
          <Checkbox checked={checked} onChange={this.check} />
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
              <div className={style.content}>
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
                <Fragment>
                  <IconButton onClick={this.toggleExpanded}>
                    <DetailsIcon className={classnames(style['details-icon'], expanded && style.expanded)} />
                  </IconButton>
                  <IconButton onClick={this.focus}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={this.remove}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Fragment>
              )
            }
            <Time expanded={expanded} task={task} />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskListItem;
