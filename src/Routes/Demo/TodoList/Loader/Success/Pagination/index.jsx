import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getLang from 'Src/Lang';
import urlUtility from 'Src/Utilities/urlUtility';
import router from 'Src/router';
import PageButton from './PageButton';
import style from './style.less';

const extendSize = 2;
const pageSize = 10;

const Pagination = (props) => {
  const {
    current,
    total,
    query,
  } = props;
  let pageMax = Math.ceil(total / pageSize);
  if (pageMax === 0) {
    pageMax = 1;
  }
  const rangeCurrent = Math.max(1, Math.min(pageMax, current));
  const min = Math.max(rangeCurrent - extendSize, 1);
  const max = Math.min(rangeCurrent + extendSize, pageMax);
  const length = (max - min) + 1;
  const changePage = (page) => {
    const urLSearchParams = new URLSearchParams({ ...query, page });
    if (page === 1) {
      urLSearchParams.delete('page');
    }
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  };
  return (
    <div className={style.pagination}>
      <div className={style['page-buttons']}>
        { length > 1 && Array.from(Array(length), (ori, i) => min + i).map((i) => {
            const key = i;
            return (
              <PageButton
                key={key}
                number={i}
                active={current === i}
                onClick={() => changePage(i)}
              />
            );
          })
        }
      </div>
      <div className={style.total}>
        { getLang('page', 'total', total) }
      </div>
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  query: () => {},
};

Pagination.defaultProps = {
  query: {},
};

const mapStateToProps = (state) => {
  const { search } = state.router.location;
  const query = urlUtility.searchStrToObj(search);
  let current = Number.parseInt(query.page, 10);
  if (Number.isNaN(current)) {
    current = 1;
  }

  return {
    current,
    query,
  };
};

export default connect(mapStateToProps)(Pagination);
