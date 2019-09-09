import { getGravatarUrl } from 'react-awesome-gravatar';

export function getGravatarImage(email){
  const options: GravatarOptions = {
      size: 100,
  };
  return getGravatarUrl(email, options);
}

export function getPlayerBadgeColor(position){
  if (position <= 3){
    return 'gold'
  }
  if (position <= 10){
    return 'silver'
  }
  return 'bronze'
}

export function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}
