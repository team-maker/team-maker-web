import { getGravatarUrl } from 'react-awesome-gravatar';

export function getGravatarImage(email){
  const options: GravatarOptions = {
      size: 100,
  };
  return getGravatarUrl(email, options);
}

export function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}
