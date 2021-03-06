
    var Likebox = React.createClass({
            getInitialState: function () {
            return {data: []};
        },
        componentDidMount: function () {
            this.loadLikesFromServer();
            
        },
        loadLikesFromServer: function () {
            $.ajax({
                url: '/api/score/' + this.props.id,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({like: data.like, dislike: data.dislike});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        handleSubmit: function (target, e) {

            e.preventDefault();

            if(user_id==0)
            {
                $(e.target).parent().parent().html('<p>To vote please <a class="btn btn-success" href="/user/register/">join us</a></p>');
            }
            $.ajax({
            url: '/api/score/'+target+'/' + this.props.id,
            method:"POST",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({like: data.like, dislike: data.dislike});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        },
        render: function(){
            
            return(
            <div>
            <form data-id="{this.props.id}" className="Likebox" onSubmit={this.handleSubmit}> 
                <span onClick={this.handleSubmit.bind(this, "add")} dest="up" className="glyphicon glyphicon-chevron-up btn"> {this.state.like}</span>
                <span onClick={this.handleSubmit.bind(this, "sub")} dest="down" className="glyphicon glyphicon-chevron-down btn"> {this.state.dislike}</span>
            </form>
            </div>
            )
        }
    });
