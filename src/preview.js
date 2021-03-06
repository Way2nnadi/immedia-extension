//var StyleSheet = require('react-style');

var previewStyles = {
  preview: {
    color: 'black',
    fontFamily: 'Nunito',
    position: 'fixed',
    textAlign: 'center',
    border: '1px solid #a7d7f9',
    backgroundColor: 'white',//'rgb(237,239,240)',
    // borderRadius: '4px',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    overflow: 'scroll',
    left: '176px',   //'526px',
    top: '79px',     //'78px',
    width: '384px',  //'640px',
    height: '216px', //'360px',
  },
  exitButton: {
    width: '18px',
    height: '18px',
    position: 'absolute',
    cursor: 'pointer',
    top: '0px',
    left: '0px' // Make this '623px' to move the exit button to the top, right-hand, corner
  }
};

var Preview = React.createClass({

  getInitialState: function() {
    return {
      width: this.props.windowWidth,
      height: this.props.windowHeight,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      width: nextProps.windowWidth,
      height: nextProps.windowHeight,
    });
  },

  exit: function(){
    $('#preview').empty();
  },

  render: function() {
    // this.getDynamicStyles();
    return (
      React.createElement('div', { id : 'previewContent', style : previewStyles.preview},
        // React.createElement('img', { style: previewStyles.exitButton, onClick: this.exit, src: chrome.extension.getURL('assets/exit.png') }),
        React.createElement('div', { style: {top: '0px', marginLeft: '140px', position: 'fixed', textAlign: 'center'} },
         React.createElement('img', { id: 'logo', style: {width: '80px', height: '75px', opacity: '0'}, src: chrome.extension.getURL('assets/immedia.png') })
        ),
        this.props.previewItem.source === 'nyt' ?  React.createElement(NytPreview, { previewItem : this.props.previewItem }) : null,
        this.props.previewItem.source === 'twitter' || this.props.previewItem.source === 'twitter news' ?  React.createElement(TwitterPreview, { previewItem : this.props.previewItem, width: previewStyles.preview.width, height : previewStyles.preview.height }) : null,
        this.props.previewItem.source === 'youtube' ?  React.createElement(YouTubePreview, { previewItem : this.props.previewItem }) : null
      )
    );
  },

  getDynamicStyles: function() {
    var $d3title = $('#d3title');
    previewStyles.preview.top = '7.5%';
    previewStyles.preview.left = (this.state.width / 2) - (this.state.width - 1350 < 0 ? 500 * (this.state.width / 1350) / 2 : 250) + 'px';
    previewStyles.preview.width = (this.state.width - 1350 < 0 ? 500 * (this.state.width/1350) : 550) + 'px';
    previewStyles.preview.height = (this.state.height - 600 < 0 ? 600 * (this.state.height/783) : 550) + 'px';
  },
});
