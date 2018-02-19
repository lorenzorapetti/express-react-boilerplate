const { Model } = require('objection');
const pluralize = require('pluralize');

class BaseModel extends Model {
  /**
   * Always use timestamps as default
   */
  static get timestamps() {
    return true;
  }

  /**
   * Use the lower case, plural model class name
   * as the table name
   */
  static get tableName() {
    return pluralize(this.name.toLowerCase());
  }

  /**
   * Set this directory as the model path so
   * they can get automatically imported in
   * `relationMappings` without circular dependencies
   */
  static get modelPaths() {
    return [__dirname];
  }

  static createNotFoundError() {
    return new this.NotFoundError({
      modelClass: this.name,
    });
  }
}

module.exports = BaseModel;
