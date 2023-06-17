import { Label } from './Filter.styled';
import PropTypes from 'prop-types';

export function Filter({ filter, changeFilter }) {
  return (
    <>
      <Label>
        Find contacts by name
        <input type="text" value={filter} onChange={changeFilter} />
      </Label>
    </>
  );
}

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
