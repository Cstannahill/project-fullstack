import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

function FriendsMap(props) {
  console.log(props);
  const friend = props.friend;
  const onLocalDltClicked = e => {
    e.preventDefault();
    props.onPersonClicked(props.friend.id);
  };

  const onLocalEditClicked = () => {
    props.onEditClicked(props.friend);
  };

  return (
    <div className="card friendCard col-lg-3  m-4 text-center">
      <img
        className="friend friendImage card-img-top"
        src={friend.primaryImage.url}
        alt="alt"
        height={230}
      />
      <div className="d-flex flex-column card-body">
        <h5 className="card-title text-center">{friend.title}</h5>
        <p className="card-text">{friend.bio}</p>
        <small className="text-small">
          {friend.skills
            ? friend.skills.map(skill => skill.name).join(', ')
            : null}
        </small>
        <Col className="mt-auto d-flex flex-column">
          <button
            className="friendCard btn btn-sm btn-primary mx-auto"
            onClick={onLocalEditClicked}
          >
            Edit
          </button>
          <button
            className="friendCard btn btn-sm btn-danger mx-auto px-2"
            onClick={onLocalDltClicked}
          >
            Delete
          </button>
        </Col>
      </div>
    </div>
  );
}
FriendsMap.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    primaryImage: PropTypes.shape({
      url: PropTypes.string
    })
  }),
  onEditClicked: PropTypes.func,
  onPersonClicked: PropTypes.func
};

export default React.memo(FriendsMap);
