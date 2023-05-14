import { ICategory } from '@modules/models/category'

/**
 * Get name of category in format of `emoji・category_name` or just a `category_name` if emoji is null
 *
 * @param {ICategory} category instance of ICategory interface
 * @returns {string} returns category name in right format
 * @example
 * // emoji・category_name
 * getCategoryName(category: ICategory)
 */
export function getCategoryName(category: ICategory): string {
  const name = []
  if (category.emoji) name.push(category.emoji)
  name.push(category.name)
  return name.join('・')
}
