import React, { useState } from 'react'

import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import { Button } from 'reactstrap'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'


const myTheme = {
  // Theme object to extends default dark theme.

}
// const SecondPage = () => (

//   <ImageEditor
//     includeUI={{
//       loadImage: {
//         path: 'img/sampleImage.jpg',
//         name: 'SampleImage'
//       },
//       theme: myTheme,
//       menu: ['shape', 'filter', 'draw'],
//       initMenu: 'draw',
//       uiSize: {
//         width: '80%',
//         height: '700px'
//       },
//       menuBarPosition: 'bottom'
//     }}

//     cssMaxHeight={500}
//     cssMaxWidth={700}
//     selectionStyle={{
//       cornerSize: 20,
//       rotatingPointOffset: 20
//     }}
//     usageStatistics={true}
//   />
// )


const imageEditorOptions = {
  // sort of option properties.

}

const SecondPage = () => {
  // const editorRef = React.createRef()

  // const handleClickButton = () => {
  //   const editorInstance = editorRef.current.getInstance()

  //   editorInstance.flipX()
  // }
  const { register, errors, handleSubmit, trigger } = useForm()
  const [image, setImage] = useState('')
  const [sketch, setSketch] = useState('')


  const sendImage = () => {
    console.log("Test")
    if (isObjEmpty(errors)) {
      useJwt.SendImage(image)
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
          } else {
            setValErrors({})
            console.log(res)
            // setAuthenicationNumber(res)
            // toast.success(
            //   <Toast />
            // )
          }

        })
    }
  }

  const sendSketch = () => {
    if (isObjEmpty(errors)) {
      useJwt.SendImage(sketch)
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
          } else {
            setValErrors({})
            console.log(res)
            // setAuthenicationNumber(res)
            // toast.success(
            //   <Toast />
            // )
          }

        })
    }
  }

  const handleFileOnChange = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setImage(reader.result)
    }
    setImage(file)
    reader.readAsDataURL(file)
  }

  const handleFileOnChange2 = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setSketch(reader.result)
    }
    setSketch(file)
    reader.readAsDataURL(file)
  }

  let profile_preview = null
  if (image !== '') {
    profile_preview = <img className='profile_preview' style={{ width: 200, height: 200 }} src={image}></img>
  }

  let sketchImage = null
  if (sketch !== '') {
    sketchImage = <img style={{ width: 400, height: 400 }} src={sketch}></img>
  }
  return (
    // <>
    //   <ImageEditor ref={editorRef} {...imageEditorOptions} />
    //   <button onClick={handleClickButton}>Flip image by X Axis!</button>
    // </>

    <div>
      <input type='file'
        accept='image/*'
        name='profile_img'
        onChange={handleFileOnChange}>
      </input>
      {profile_preview}

      <Button.Ripple color='primary' style={{ margin: 10 }} onClick={sendImage}>
        Send
      </Button.Ripple>

      <input type='file'
        accept='image/*'
        name='profile_img'
        onChange={handleFileOnChange2}>
      </input>
      {sketchImage}

      <Button.Ripple color='primary' style={{ margin: 10 }} onClick={sendSketch}>
        Draw
      </Button.Ripple>

    </div>
  )
}
export default SecondPage
