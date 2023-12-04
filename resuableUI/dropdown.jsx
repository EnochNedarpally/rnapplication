/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

const Dropdown = (props) => {
    /* The local state that will be used to decide if the Drodown can be expended */
    const [isVisible, setVisibility] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [filterText, setFilterText] = useState('');
    const [collectionList, setCollectionList] = useState(props.collection)

    const expand = () => setVisibility(!isVisible);
    
    const selectedValue = (v) => {
        props.selectedOption(v);
        /* Collapse the View which is showing options */
        setVisibility(false);
        setSelectedOption(v);
    };
    const handleOnChange=(filterText)=>{
        setFilterText(filterText)
        const filtered = props.collection.filter(c=>c.toLowerCase().includes(filterText.toLowerCase()))
        console.log("filtered",filtered)
        setCollectionList(filtered)
    }

    const handleFilterChanges=()=>{
        // const filtered = props.collection.filter(c=>c.toLowerCase()==filterText.toLocaleLowerCase())
        // console.log("filtered",filtered)
        // setCollectionList(filtered)
        let selOption= collectionList.length >0 ? collectionList[0] : ""
        props.selectedOption(selOption)
        setSelectedOption(selOption);
        setVisibility(false)
    }
console.log("collectionList",collectionList);
    if(props.collection === undefined || props.collection.length === 0){
        return <View style={{backgroundColor:'red'}}><Text> No data to Show </Text></View>
    }

    return (
        <View style={styles.ddlView}>
            <TouchableOpacity style={styles.ddlHeader} onPress={expand}>
                <Text style={styles.textHeader}>{selectedOption!==""? selectedOption:  props.title}</Text>
            </TouchableOpacity>
            {
                isVisible && <View style={styles.viewDdlOptions}>
                    <TextInput style={styles.textInput} value= {filterText} onChangeText={text=>handleOnChange(text)} onBlur={handleFilterChanges}/>
                    {
                        collectionList.map((opt,idx)=>(
                            <TouchableOpacity style={styles.ddlOptionItems} key={idx}
                              onPress={()=>selectedValue(opt)}
                            >
                                <Text>{opt}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    ddlView : {
        width: '100%',
        backgroundColor: 'grey'
    },
    ddlHeader : {
        width: '100%',
        backgroundColor: 'grey'
    },
    textHeader: {
        fontSize: 15,
        color: 'yellow',
        fontFamily: 'Segoe UI'
    },
    viewDdlOptions : {
        width: '100%'
    },
    ddlOptionItems : {
        width: '100%',
        fontFamily: 'Times New Roman',
        color: 'black',
        backgroundColor: 'grey'
    },
    textInput:{
        height:40,
        fontFamily:'Times New Roman',
        fontSize:15,
        fontWeight:'bold',
        color:'cyan',
        backgroundColor:'lightyellow',
    },
});
export default Dropdown;