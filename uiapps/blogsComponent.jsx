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
const [blogs, setBlogs] = useState(posts)
const [selectedBlog, setSelectedBlog] = useState(null)
const [filterText, setFilterText] = useState("")
const saveBlog = ()=>{
  const blg=logic.createNewPost(blog)
  setBlogs(blg)
  setBlogInfo({
    id:"",
    title:"",
    details:""
  })
}
const handleFilter = ()=>{
  let filterBlog = posts.filter((p)=> {p.title == filterText})
  setBlogs(filter)
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
      <Text>Filter</Text>
      <TextInput value={filterText} onChange={text=>setFilterText(text)} onBlur={handleFilter}/>
      {/* <Text>{JSON.stringify(blogs)}</Text> */}
      <Text>Selcted Blog</Text>
      <TextInput value={`${selectedBlog.id},${selectedBlog.title}, ${selectedBlog.details}`}/>
      <FlatList
      data={blogs}
      keyExtractor={({id})=>id}
      renderItem={({item})=>{
        <Text onPress={()=>setSelectedBlog(item)} style={styles.textInput}>
          {item.id} {item.title} {item.details}
        </Text>
      }}
      />
    </View>
  )
}

export default BlogsComponent