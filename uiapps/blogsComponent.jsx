import { View, Text, TextInput, FlatList, Button } from 'react-native'
import React,{useState} from 'react'
import { styles } from './styles'
import { Blogger } from '../models/logic'
import { posts } from '../models/collections'

const BlogsComponent = () => {
  const logic = new Blogger()
const [blog, setBlogInfo] = useState({
  id:"",
  title:"",
  details:""
})
const [blogs, setBlogs] = useState(logic.getPosts())
const [selectedBlog, setSelectedBlog] = useState({
  id:"",
  title:"",
  details:""
})
const [filterText, setFilterText] = useState("")
const saveBlog = ()=>{
 
  const blg=selectedBlog.id !=="" ? logic.updatePost(blog) :logic.createNewPost(blog)
  setBlogs(blg)
  setBlogInfo({
    id:"",
    title:"",
    details:""
  })
}

const deleteBlog = ()=>{
  const blg=logic.deletPost(selectedBlog);
  setBlogs(blg)
  setBlogInfo({
    id:"",
    title:"",
    details:""
  })
}
const handleFilter = ()=>{
  let filterBlog = posts.filter((p)=> { return p.title.toLowerCase() == filterText.toLowerCase()})
  setBlogs(filterBlog)
}
const handleSelect = (item)=>{
  setBlogInfo(item)
  setSelectedBlog(item)
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          BLOGS UI
      </Text>
      <Text style={styles.text}>Id</Text>
      <TextInput value={blog.id} onChangeText={text=>setBlogInfo({...blog,id:text})} style={styles.textInput}/>
      <Text style={styles.text}>Title</Text>
      <TextInput value={blog.title} onChangeText={text=>setBlogInfo({...blog,title:text})} style={styles.textInput}/>
      <Text style={styles.text}>Details</Text>
      <TextInput value={blog.details} onChangeText={text=>setBlogInfo({...blog,details:text})} style={styles.textInput} multiline={true} />
      <Button onPress={saveBlog} title ="Save Blog Info"/>
      <Button onPress={deleteBlog} title ="Delete"/>
      <Text>Filter</Text>
      <TextInput style={styles.textInput} value={filterText} onChangeText={text=>setFilterText(text)} onBlur={handleFilter}/>
      {/* <Text>{JSON.stringify(blogs)}</Text> */}
      <Text>Selcted Blog</Text>
      <TextInput style={styles.textInput} value={`${selectedBlog.id},${selectedBlog.title}, ${selectedBlog.details}`}/>
      <FlatList
      data={blogs}
      keyExtractor={({id})=>id}
      renderItem={({item})=>(
        <Text  onPress={()=>handleSelect(item)}>
          {item.id} {item.title} {item.details}
        </Text>
  )}
      />
    </View>
  )
}

export default BlogsComponent