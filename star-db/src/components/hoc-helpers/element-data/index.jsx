import React, { Component } from "react";
import ErrorIndicator from "../../error-indicator";
import Spinner from "../../spinner";

const elementData = (entityName) => (View) => {
  return class extends Component {
    state = {
      item: null,
      image: null,
      loading: true,
      error: false,
    };

    componentDidMount() {
      this.updateItem();
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl
      ) {
        this.setState({
          item: null,
          image: null,
          loading: true,
          error: false,
        });
        this.updateItem();
      }
    }

    updateItem() {
      const { itemId, getData, getImageUrl } = this.props;
      if (!itemId) {
        return;
      }

      getData(itemId)
        .then((item) => {
          this.setState({
            item,
            image: getImageUrl(item),
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

    render() {
      const { itemId } = this.props;
      if (!itemId) {
        return <span>{`Select a ${entityName} from a list`}</span>;
      }
      const { item, image, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} item={item} image={image} />;
    }
  };
};

export default elementData;
