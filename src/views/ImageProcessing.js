import React from 'react';

import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';


const myTheme = {
    // Theme object to extends default dark theme.

};

const Test = () => (
    <ImageEditor
        includeUI={{
            loadImage: {
                path: 'img/sampleImage.jpg',
                name: 'SampleImage',
            },
            theme: myTheme,
            menu: ['shape', 'filter', 'draw'],
            initMenu: 'filter',
            uiSize: {
                width: '1000px',
                height: '700px',
            },
            menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
        }}
        usageStatistics={true}
    />
);


const imageEditorOptions = {
    // sort of option properties.
};

class MyComponent extends React.Component {
    editorRef = React.createRef();

    handleClickButton = () => {
        const editorInstance = this.editorRef.current.getInstance();

        editorInstance.flipX();
    };
    render() {
        return (
            <>
                <ImageEditor ref={this.editorRef} {...imageEditorOptions} />
                <button onClick={this.handleClickButton}>Flip image by X Axis!</button>
            </>
        );
    }
}
export default Test;