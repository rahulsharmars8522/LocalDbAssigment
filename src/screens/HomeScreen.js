import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Header from '../components/Header';
import FabButton from '../components/FabButton';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, fetchItems, updateItem } from '../Redux/Actions/itemActions';
import { colors } from '../utils';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  // State for modal visibility and current item being edited
  const [modalVisible, setModalVisible] = useState(false);  
  const [currentItem, setCurrentItem] = useState(null);  
  const navigation = useNavigation()
  // Redux state: Fetch items from Redux store
  const items = useSelector((state) => state.localData);  

  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Handle editing an item
  const onEdit = (item) => {
    //navigate to edit screen
    navigation.navigate('AddEditScreen', { currentItem: item });
   
  };

  // Handle saving the item (add or update)
  const handleSave = (data) => {
    if (currentItem) {
      // Update existing item
      dispatch(updateItem({
        id: currentItem.id,
        name: data.name,
        description: data.description,
      }));
    } else {
      // Add new item
      dispatch(addItem(data));
    }
    dispatch(fetchItems());  // Fetch updated items
    setModalVisible(false);  // Close modal after saving
  };

  // Handle deleting an item
  const onDelete = (id) => {
    dispatch(deleteItem(id));  // Dispatch delete action
  };

  // Empty state component when no data is found
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Data found</Text>
    </View>
  );

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{padding:"2%"}}>
        <Text style={styles.itemText}>{"Name: "}{item.name}</Text>
        <Text style={styles.itemText}>{"Description: "}{item.description}</Text>
    

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={() => onDelete(item.id)}>
          <Text style={styles.editText}>Delete</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />

      <FlatList
        data={items}
        contentContainerStyle={styles.flatListContainer}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        keyExtractor={(item) => item.id ? item.id.toString() : 'defaultKey'}  // Ensure id is a string
      />

      <FabButton onPress={() =>  navigation.navigate('AddEditScreen', { currentItem: null })} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatListContainer: {
    padding: '3%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor:colors.lightBlack,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop:'1%'
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color:colors.baseBlack
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:'30%',
    padding:"2%",
    paddingTop:'5%'
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  emptyText:{
    flex: 1,
    fontSize: 16,
    textAlign:'center',
    marginTop:'50%'
  },
  editButton: {
    width: '50%',
    padding: 10,
    marginHorizontal:'3%',
    backgroundColor: colors.baseBlack,
    borderRadius: 15,  // Small radius for the button
    alignItems: 'center',
    marginBottom: "2%",
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
