var React = require('react');

var ModalWindow = React.createClass({
    render: function () {
        return (
            <div className="modal__window">
                <button className="modal__window__close" onClick={this.props.onClose}>X</button>
                <header className="modal__window__title">{this.props.title}</header>
                <main className="modal__window__content">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

var Modal = React.createClass({
    render: function () {
        if (!this.props.triggered) {
            return <div></div>;
        }

        return (
            <div className="modal__wrapper">
                <div className="modal__overlay"></div>
                <div className="modal__container">
                    <ModalWindow title={this.props.title} onClose={this.props.onClose}>
                        {this.props.children}
                    </ModalWindow>
                </div>
            </div>
        );
    }
});

module.exports = Modal;
