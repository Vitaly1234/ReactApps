import "./list-data.scss";

import React, { Component } from "react";

import ErrorIndicator from "../../error-indicator";
import Spinner from "../../spinner";

const listData = (View) => {
  return class extends Component {
    state = {
      data: null,
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
      loading: true,
      error: false,
    };

    componentDidMount() {
      this.update();
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        this.props.getData !== prevProps.getData ||
        this.state.currentPage !== prevState.currentPage
      ) {
        this.update();
      }
    }

    update() {
      this.setState({
        loading: true,
        error: false,
      });
      this.props
        .getData(this.state.currentPage)
        .then((pagebleData) => {
          this.setState({
            data: pagebleData.data,
            totalPages: pagebleData.totalPages,
            hasNext: pagebleData.hasNext,
            hasPrevious: pagebleData.hasPrevious,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
          });
        });
    }

    changePage(isNext) {
      this.setState(({ currentPage }) => ({
        currentPage: currentPage + (isNext ? 1 : -1),
      }));
    }

    render() {
      const {
        data,
        loading,
        error,
        totalPages,
        currentPage,
        hasNext,
        hasPrevious,
      } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return (
        <div className="pageble-list">
          <View {...this.props} data={data} />
          <div className="paging-block">
            <button
              onClick={() => this.changePage()}
              disabled={!hasPrevious}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => this.changePage(true)}
              disabled={!hasNext}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      );
    }
  };
};

export default listData;
