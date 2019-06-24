import nanoid from 'nanoid';

export const addId = (data) => [...data].map( (row) => {
  row["id"] = nanoid(6);
  return row;
})
