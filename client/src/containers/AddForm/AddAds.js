import React, { Component } from 'react';
import { postProduct } from '../../actions/index';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color'
import convertPrice from '../../helpers/convertPrice';
import reverseConvertPrice from '../../helpers/reverseConvertPrice';

class AddAds extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: '',
         rate: 1,
         description: '',
         price: '',
         brand: '',
         detailProduct: '',
         category: '',
         file: '',
         color: ['#rrggbb'],
         size: [],
         capacities: [],
         stock: 0,
         displayPrice: '',
      }
   }

   handleChange = (event) => {
      if (event.target.name === 'displayPrice') {
         this.setState({
            [event.target.name]: convertPrice(event.target.value),
            price: reverseConvertPrice(event.target.value)
         })
      } else {
         this.setState({ [event.target.name]: event.target.value })
      }
   }

   handleFileUpload = (event) => {
      this.setState({ file: event.target.files[0] })
      console.log(event.target.files[0])
   }

   handleSubmit = (event) => {
      event.preventDefault();
      const { history } = this.props;
      console.log(this.state);
      console.log(history)
      // this.props.postProduct(this.state, history);
   }

   onAddColor = (event) => {
      event.preventDefault();
      let { color } = this.state;
      console.log(this.state.color)
      this.setState({ color: [...color, '#rrggbb'] })
   }
   onDeleteColor = (event) => {
      event.preventDefault();
      console.log(this.state.color)
      this.setState(state => ({
         color: state.color.splice(state.color.length - 1, 1)
      }))
   }


   render() {
      const colors = [...this.state.color].map((e, i) => {
         return (
            <div className="col-1" key={i}>
               <div className="form-group">
                  <SketchPicker />
               </div>
            </div>
         )
      })


      return (
         <div className="container">
            <div className="card">
               <div className="card-header">
                  Add Ads
               </div>
               <div className="card-body">
                  <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Title</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <input
                                 type="text"
                                 className="form-control"
                                 placeholder="Title..."
                                 name="title"
                                 required={true}
                                 value={this.state.title}
                                 onChange={this.handleChange}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Category</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <select className="custom-select custom-select" value={this.state.category} required={true} name="category" className="form-control" onChange={this.handleChange}>
                                 <option className="form-control" value="" disabled>Choose category</option>
                                 <option className="form-control" value="phone">Phone/Smartphone</option>
                                 <option className="form-control" value="fashion">Fashion</option>
                                 <option className="form-control" value="vehicle">Car/Motorcycle</option>
                                 <option className="form-control" value="electronic">Electronic</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     {
                        this.state.category === "phone" && (
                           <>
                              <div className="row">
                                 <div className="col-2">
                                    <div className="form-check">
                                       <label className="form-check-label">
                                          <b>Color</b>
                                       </label>
                                    </div>
                                 </div>

                                 <div className="col-1">
                                    <div className="form-group">
                                       <input
                                          type="color"
                                          value={this.state.color}
                                          name="color"
                                          onChange={this.handleChange}
                                          required={true}
                                       />
                                    </div>
                                 </div>

                                 {colors}

                                 {this.state.color.length < 5 &&
                                    (<div className="col-1">
                                       <div className="form-group">
                                          <button className="btn"><i style={{ fontSize: "20px" }} className="far fa-plus-square" onClick={this.onAddColor}></i></button>
                                       </div>
                                    </div>
                                    )}

                                 {this.state.color.length >= 1 &&
                                    (<div className="col-1">
                                       <div className="form-group">
                                          <button className="btn"><i style={{ fontSize: "20px" }} className="far fa-minus-square" onClick={this.onDeleteColor}></i></button>
                                       </div>
                                    </div>
                                    )}

                              </div>

                              <div className="row">
                                 <div className="col-2">
                                    <div className="form-check">
                                       <label className="form-check-label">
                                          <b>Capacity</b>
                                       </label>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <div className="form-check form-check-inline">
                                          <input className="form-check-input" name="capacities" type="checkbox" value="32" />
                                          <label className="form-check-label">32 GB</label>
                                       </div>
                                       <div className="form-check form-check-inline">
                                          <input className="form-check-input" name="capacities" type="checkbox" value="64" />
                                          <label className="form-check-label">64 GB</label>
                                       </div>
                                       <div className="form-check form-check-inline">
                                          <input className="form-check-input" name="capacities" type="checkbox" value="128" />
                                          <label className="form-check-label">128 GB</label>
                                       </div>
                                       <div className="form-check form-check-inline">
                                          <input className="form-check-input" name="capacities" type="checkbox" value="256" />
                                          <label className="form-check-label">256 GB</label>
                                       </div>
                                       <div className="form-check form-check-inline">
                                          <input className="form-check-input" name="capacities" type="checkbox" value="512" />
                                          <label className="form-check-label">512 GB</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="row">
                                 <div className="col-2">
                                    <div className="form-check">
                                       <label className="form-check-label">
                                          <b>Stock</b>
                                       </label>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <input
                                          type="number"
                                          value={this.state.stock}
                                          onChange={this.handleChange}
                                          className="form-control"
                                          name="stock"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </>
                        )
                     }

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Rate</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <select className="custom-select custom-select" value={this.state.rate} required={true} name="rate" className="form-control" onChange={this.handleChange}>
                                 <option className="form-control" value="1">1</option>
                                 <option className="form-control" value="2">2</option>
                                 <option className="form-control" value="3">3</option>
                                 <option className="form-control" value="4">4</option>
                                 <option className="form-control" value="5">5</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Description</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <textarea
                                 className="form-control"
                                 placeholder="Type description.."
                                 rows="5"
                                 name="description"
                                 required={true}
                                 value={this.state.description}
                                 onChange={this.handleChange}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Price</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <input
                                 type="text"
                                 value={this.state.displayPrice}
                                 onChange={this.handleChange}
                                 className="form-control"
                                 placeholder="Price"
                                 name="displayPrice"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Brand</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <input
                                 name="brand"
                                 value={this.state.brand}
                                 onChange={this.handleChange}
                                 type="text"
                                 className="form-control"
                                 placeholder="Brand" />
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Detail Product</b>
                              </label>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <textarea
                                 className="form-control"
                                 placeholder="Detail product (using markdown)"
                                 rows="5"
                                 name="detailProduct"
                                 value={this.state.detailProduct}
                                 onChange={this.handleChange}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-2">
                           <div className="form-check">
                              <label className="form-check-label">
                                 <b>Product image</b>
                              </label>
                           </div>
                        </div>

                        <div className="col">
                           <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                 <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                              </div>
                              <div className="custom-file">
                                 <input
                                    className="custom-file-input"
                                    type="file"
                                    name="file"
                                    onChange={this.handleFileUpload}
                                    required={true}
                                 />
                                 <label className="custom-file-label" >Choose file</label>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-4 offset-2">
                           <button type="submit" className="btn btn-success">Submit ads</button>
                           <button className="btn btn-warning ml-2">Cancel</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => ({
   postProduct: (form, history) => dispatch(postProduct(form, history))
})

export default connect(
   null,
   mapDispatchToProps
)(AddAds)