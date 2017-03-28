export default class CollectionOption {
  constructor(collectionName, filter, retriever) {
    this._collectionName = collectionName;
    this._filter = filter;
    this._retriever = retriever;
  }
  collectionName() {
    return this._collectionName;
  }
  filter() {
    return this._filter;
  }
  retriever() {
    return this._retriever;
  }
}
