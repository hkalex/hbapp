import { FavoriteSimpleSchema } from './schemas/Favorite';
import CollectionBase from './CollectionBase';

const favorites = new CollectionBase('favorites');
favorites.attachSchema(FavoriteSimpleSchema);

export default favorites;