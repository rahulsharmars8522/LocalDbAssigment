import { takeEvery, put, call } from 'redux-saga/effects';  // Importing effects from redux-saga
import { fetchItemsFromDb, insertItemToDb, updateItemInDb, deleteItemFromDb } from '../../sqlite/sqliteHelper';  // SQLite helper functions
import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, UPDATE_ITEM } from '../Constants';  // Constants for action types
import { fetchItems, setItems } from '../Actions/itemActions';  // Action creators to dispatch to Redux

/** fetchItemsSaga - This saga handles fetching all items from the database. */
function* fetchItemsSaga() {
  try {
    // Fetch items from the database
    const items = yield call(fetchItemsFromDb);
    // Dispatch setItems action to store the fetched items in Redux
    yield put(setItems(items));
  } catch (error) {
    console.log('Error fetching items:', error);  // Handle any errors that occur during fetching
  }
}

/** addItemSaga - This saga handles adding a new item to the database. */
function* addItemSaga(action) {
  try {
    // Insert the new item into the database
    const insertId = yield call(insertItemToDb, action.payload.name, action.payload.description);
    // console.log(`Item added with ID: ${insertId}`);
    
    // After adding, dispatch `FETCH_ITEMS` action to update the items in Redux
    yield put(fetchItems());
  } catch (error) {
    console.log('Error adding item:', error);  // Handle any errors that occur during adding
  }
}

/** updateItemSaga - This saga handles updating an existing item in the database. */
function* updateItemSaga(action) {
  try {
    // Update the item in the database
    yield call(updateItemInDb, action.payload.id, action.payload.name, action.payload.description);
    
    // After updating, dispatch `FETCH_ITEMS` action to update the items in Redux
    yield put(fetchItems());
  } catch (error) {
    console.log('Error updating item:', error);  // Handle any errors that occur during updating
  }
}

/** deleteItemSaga - This saga handles deleting an item from the database. */
function* deleteItemSaga(action) {
  try {
    // Delete the item from the database using its ID
    yield call(deleteItemFromDb, action.payload);
    
    // After deletion, dispatch `FETCH_ITEMS` action to update the items in Redux
    yield put(fetchItems());
  } catch (error) {
    console.log('Error deleting item:', error);  // Handle any errors that occur during deletion
  }
}

/** rootSaga - The root saga listens for specific actions and triggers corresponding sagas. */
export default function* rootSaga() {
  // Watch for the actions and trigger the appropriate saga
  yield takeEvery(FETCH_ITEMS, fetchItemsSaga);  // Trigger the fetchItemsSaga when FETCH_ITEMS action is dispatched
  yield takeEvery(ADD_ITEM, addItemSaga);  // Trigger the addItemSaga when ADD_ITEM action is dispatched
  yield takeEvery(UPDATE_ITEM, updateItemSaga);  // Trigger the updateItemSaga when UPDATE_ITEM action is dispatched
  yield takeEvery(DELETE_ITEM, deleteItemSaga);  // Trigger the deleteItemSaga when DELETE_ITEM action is dispatched
}
