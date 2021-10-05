import React from 'react'

import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'


const myTheme = {
  // Theme object to extends default dark theme.

}

const imageEditor = () => new tui.component.ImageEditor('.tui-image-editor canvas', {
  cssMaxWidth: document.documentElement.clientWidth,
  cssMaxHeight: document.documentElement.clientHeight,
  selectionStyle: {
    cornerSize: 50,
    rotatingPointOffset: 100
  }
})

const SecondPage = () => (
  <ImageEditor
    includeUI={{
      loadImage: {
        path: 'img/sampleImage.jpg',
        name: 'SampleImage'
      },
      theme: myTheme,
      menu: ['shape', 'filter', 'draw'],
      initMenu: 'draw',
      uiSize: {
        width: '80%',
        height: '700px'
      },
      menuBarPosition: 'bottom'
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70
    }}
    usageStatistics={true}
  />
)


const imageEditorOptions = {
  // sort of option properties.
}

const MyComponent = () => {
  const editorRef = React.createRef()

  const handleClickButton = () => {
    const editorInstance = editorRef.current.getInstance()

    editorInstance.flipX()
  }
  return (
    <>
      <ImageEditor ref={editorRef} {...imageEditorOptions} />
      <button onClick={handleClickButton}>Flip image by X Axis!</button>
    </>
  )
}
export default SecondPage
