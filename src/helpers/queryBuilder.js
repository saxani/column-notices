import {
  collection,
  query,
  orderBy,
  startAfter,
  endBefore,
  limit,
  where,
} from 'firebase/firestore';
import { db } from './db'; // Import this line to use the Firestore database connection

// So this works for the filter itself. But it doesn't work well in conjunction with Search
export const queryBuilder = (
  search = null,
  dateTo = '',
  dateFrom = '',
  previous = null,
  next = null
) => {
  const conditions = [];

  if (dateFrom) {
    conditions.push(where('publicationDate', '>=', new Date(dateFrom)));
  }

  if (dateTo) {
    conditions.push(where('publicationDate', '<=', new Date(dateTo)));
  }

  if (search) {
    conditions.push(where('title', '==', search));
  }

  conditions.push(orderBy('publicationDate', 'desc'));

  if (next) {
    conditions.push(startAfter(next));
  }

  if (previous) {
    conditions.push(endBefore(previous));
  }

  conditions.push(limit(10));

  const q = query(collection(db, 'notices'), ...conditions);

  return q;
};
