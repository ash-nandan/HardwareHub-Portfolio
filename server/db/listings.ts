import {
  UserListing,
  NewListingData,
  Listing,
  ListingActiveTime,
  ClosedListingCheck,
} from 'models/listings'
import db from './connection'

export async function createListing(
  listingData: NewListingData,
): Promise<UserListing> {
  const [newListing] = await db<UserListing>('user_listings')
    .insert(listingData)
    .returning('*')
  return newListing
}

export async function getListingById(
  listingId: number,
): Promise<ListingActiveTime> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .where({ 'user_listings.id': listingId })
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
      'user_listings.user_id as userId',
      'user_listings.created_at as createdAt',
      'user_listings.is_active as isActive',
    )
    .first()

  return res
}

export async function updateListing(
  listingData: UserListing,
): Promise<UserListing> {
  const [updatedListing] = await db<UserListing>('user_listings')
    .where({
      id: listingData.id,
    })
    .update(listingData)
    .returning('*')
  return updatedListing
}

export async function deleteListing(listingId: number): Promise<number> {
  return db('user_listings').where({ 'user_listings.id': listingId }).del()
}

export async function searchAllListings(
  catId: number,
  conId: number,
  keywords: string,
): Promise<Listing[]> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .where({
      'user_listings.category_id': catId,
      'user_listings.condition_id': conId,
    })
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
      'user_listings.user_id as userId',
    )

  const keywordStrings = keywords
    .trim()
    .toLowerCase()
    .split(/\s+/) //split to new string at a space of one or more
    .filter((w) => w.length > 0) //filter out empty strings

  if (keywordStrings.length === 0) {
    return res //if no keywords entered, return all category + keyword matches
  }

  const matches = res.filter((listing) => {
    const searchText =
      `${listing.itemName} ${listing.itemDescription}`.toLowerCase()

    //return with every check - a function that checks that ALL items in array pass ie. do all keyword strings appear in the search string?
    return keywordStrings.every((word: string) => searchText.includes(word))
  })

  return matches
}

export async function getAllListings(): Promise<Listing[]> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
      'user_listings.user_id as userId',
    )

  return res
}

export async function getAllRecentListings(): Promise<ListingActiveTime[]> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .where({ 'user_listings.is_active': true }) //active only
    .orderBy('user_listings.created_at', 'desc') //newest times first
    .limit(6) //limit of six listings at most
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
      'user_listings.created_at as createdAt',
      'user_listings.is_active as isActive',
      'user_listings.user_id as userId',
    )

  return res
}

export async function checkClosedListings(
  userId: number,
): Promise<ClosedListingCheck[]> {
  const res = await db('user_listings')
    .where({
      'user_listings.user_id': userId,
      'user_listings.is_active': false,
    })
    .select(
      'user_listings.id as listingId',
      'user_listings.item_name as itemName',
      'user_listings.item_image as itemImage',
      'user_listings.is_active as isActive',
    )

  return res
}

export async function closeListings() {
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)

  const res = await db('user_listings')
    .where('is_active', true)
    .andWhere('created_at', '<', fiveDaysAgo) //andWhere gives clairty of both
    .update({ is_active: false })

  return res
}
