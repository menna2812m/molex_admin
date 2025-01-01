<template>
  <Pageheader heading="Profile" maintitle="Pages" subtitle="Profile" />

  <div class="row square">
    <div class="col-lg-12 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div class="panel profile-cover">
            <div class="profile-cover__img">
              <img src="../../../assets/img/users/1.jpg" alt="img" />
              <h3 class="h3">Sonia Taylor</h3>
            </div>
            <div class="btn-profile btn-list">
              <button class="btn btn-rounded btn-danger d-inline-flex align-items-center">
                <i class="fe fe-plus me-2"></i>
                <span>Follow</span>
              </button>
              <button class="btn btn-rounded btn-success d-inline-flex align-items-center">
                <i class="fe fe-message-square me-2"></i>
                <span>Message</span>
              </button>
            </div>
            <div class="profile-cover__action bg-img"></div>
            <div class="profile-cover__info">
              <ul class="nav">
                <li><strong>26</strong>Projects</li>
                <li><strong>33</strong>Followers</li>
                <li><strong>136</strong>Following</li>
              </ul>
            </div>
          </div>
          <div class="profile-tab tab-menu-heading">
            <nav class="nav main-nav-line p-3 tabs-menu profile-nav-line bg-gray-100">
              <a class="nav-link active" data-bs-toggle="tab" href="#about">About</a>
              <a class="nav-link" data-bs-toggle="tab" href="#edit">Edit Profile</a>
              <a class="nav-link" data-bs-toggle="tab" href="#timeline">Timeline</a>
              <a class="nav-link" data-bs-toggle="tab" href="#gallery">Gallery</a>
              <a class="nav-link" data-bs-toggle="tab" href="#friends">Friends</a>
              <a class="nav-link" data-bs-toggle="tab" href="#settings"
                >Account Settings</a
              >
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-12 col-md-12">
      <div class="card custom-card main-content-body-profile">
        <div class="tab-content">
          <div class="main-content-body tab-pane p-4 border-top-0 active" id="about">
            <div class="card-body p-0 border p-0 rounded-10">
              <div class="p-4">
                <h4 class="tx-15 text-uppercase mb-3">BIOdata</h4>
                <p class="m-b-5">
                  Hi I'm Petey Cruiser,has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                  justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                  felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus
                  elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
                  ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                </p>
                <div class="m-t-30">
                  <h4 class="tx-15 text-uppercase mt-3">Experience</h4>
                  <div class="p-t-10">
                    <h5 class="text-primary m-b-5 tx-14">Lead designer / Developer</h5>
                    <p class="">websitename.com</p>
                    <p><b>2010-2015</b></p>
                    <p class="text-muted tx-13 m-b-0">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a galley of type
                      and scrambled it to make a type specimen book.
                    </p>
                  </div>

                  <div class="">
                    <h5 class="text-primary m-b-5 tx-14">Senior Graphic Designer</h5>
                    <p class="">coderthemes.com</p>
                    <p><b>2007-2009</b></p>
                    <p class="text-muted tx-13 mb-0">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a galley of type
                      and scrambled it to make a type specimen book.
                    </p>
                  </div>
                </div>
              </div>
              <div class="border-top"></div>
              <div class="p-4">
                <label class="main-content-label tx-13 mg-b-20">Contact</label>
                <div class="d-sm-flex">
                  <div class="mg-sm-r-20 mg-b-10">
                    <div class="main-profile-contact-list">
                      <div class="media">
                        <div class="media-icon bg-primary-transparent text-primary">
                          <i class="icon ion-md-phone-portrait"></i>
                        </div>
                        <div class="media-body">
                          <span>Mobile</span>
                          <div>+245 354 654</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mg-sm-r-20 mg-b-10">
                    <div class="main-profile-contact-list">
                      <div class="media">
                        <div class="media-icon bg-success-transparent text-success">
                          <i class="icon ion-logo-slack"></i>
                        </div>
                        <div class="media-body">
                          <span>Slack</span>
                          <div>@spruko.w</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="main-profile-contact-list">
                      <div class="media">
                        <div class="media-icon bg-info-transparent text-info">
                          <i class="icon ion-md-locate"></i>
                        </div>
                        <div class="media-body">
                          <span>Current Address</span>
                          <div>San Francisco, CA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-top"></div>
              <div class="p-3 p-sm-4">
                <label class="main-content-label tx-13 mg-b-20">Social</label>
                <div class="d-xl-flex">
                  <div class="mg-md-r-20 mg-b-10">
                    <div class="main-profile-social-list">
                      <div class="media">
                        <div class="media-icon bg-primary-transparent text-primary">
                          <i class="icon ion-logo-github"></i>
                        </div>
                        <div class="media-body">
                          <span>Linkedin</span> <a href="">linkedin.in/spruko</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mg-md-r-20 mg-b-10">
                    <div class="main-profile-social-list">
                      <div class="media">
                        <div class="media-icon bg-success-transparent text-success">
                          <i class="icon ion-logo-twitter"></i>
                        </div>
                        <div class="media-body">
                          <span>Pinterest</span> <a href="">pinterest.in/spruko</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mg-md-r-20 mg-b-10">
                    <div class="main-profile-social-list">
                      <div class="media">
                        <div class="media-icon bg-info-transparent text-info">
                          <i class="icon ion-logo-linkedin"></i>
                        </div>
                        <div class="media-body">
                          <span>Twitter</span> <a href="">twitter.in/spruko</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mg-md-r-20 mg-b-10">
                    <div class="main-profile-social-list">
                      <div class="media">
                        <div class="media-icon bg-danger-transparent text-danger">
                          <i class="icon ion-md-link"></i>
                        </div>
                        <div class="media-body">
                          <span>My Portfolio</span> <a href="">spruko.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-content-body tab-pane p-4 border-top-0" id="edit">
            <div class="card-body border">
              <div class="mb-4 main-content-label">Personal Information</div>
              <form class="form-horizontal">
                <div class="mb-4 main-content-label">Name</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">User Name</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="User Name"
                        value="Mack Adamia"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">First Name</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        value="Mack Adamia"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">last Name</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        value="Mack Adamia"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Nick Name</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nick Name"
                        value="Spruha"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Designation</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Designation"
                        value="Web Designer"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-4 main-content-label">Contact Info</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Email<i>(required)</i></label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        value="info@Spruha.in"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Website</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Website"
                        value="@spruko.w"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Phone</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="phone number"
                        value="+245 354 654"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Address</label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        class="form-control"
                        name="example-textarea-input"
                        rows="2"
                        placeholder="Address"
                      >
San Francisco, CA</textarea
                      >
                    </div>
                  </div>
                </div>
                <div class="mb-4 main-content-label">Social Info</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Twitter</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="twitter"
                        value="twitter.com/spruko.me"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Facebook</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="facebook"
                        value="https://www.facebook.com/Spruha"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Google+</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="google"
                        value="spruko.com"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Linked in</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="linkedin"
                        value="linkedin.com/in/spruko"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Github</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="github"
                        value="github.com/sprukos"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-4 main-content-label">About Yourself</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Biographical Info</label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        class="form-control"
                        name="example-textarea-input"
                        rows="4"
                        placeholder=""
                      >
pleasure rationally encounter but because pursue consequences that are extremely painful.occur in which toil and pain can procure him some great pleasure..</textarea
                      >
                    </div>
                  </div>
                </div>
                <div class="mb-4 main-content-label">Email Preferences</div>
                <div class="form-group mb-0">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Verified User</label>
                    </div>
                    <div class="col-md-9">
                      <div class="form-controls-stacked">
                        <label class="ckbox mg-b-10"
                          ><input checked="" type="checkbox" /><span>
                            Accept to receive post or page notification emails</span
                          ></label
                        >
                        <label class="ckbox"
                          ><input checked="" type="checkbox" /><span>
                            Accept to receive email sent to multiple recipients</span
                          ></label
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="main-content-body tab-pane border-top-0" id="timeline">
            <div class="border p-4">
              <div class="main-content-body main-content-body-profile">
                <div class="main-profile-body p-0">
                  <div class="row row-sm">
                    <div class="col-12">
                      <div class="card mg-b-20 border">
                        <div class="card-header p-4">
                          <div class="media">
                            <div class="media-user me-2">
                              <div class="main-img-user avatar-md">
                                <img
                                  alt=""
                                  class="rounded-circle"
                                  src="../../../assets/img/users/6.jpg"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 mg-t-2 ms-2">Mintrona Pechon Pechon</h6>
                              <span class="text-primary ms-2">just now</span>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a
                                  class="new option-dots2 p-2"
                                  data-bs-toggle="dropdown"
                                  href="JavaScript:void(0);"
                                  ><i class="fas fa-ellipsis-v"></i
                                ></a>
                                <div class="dropdown-menu dropdown-menu-end shadow">
                                  <a class="dropdown-item" href="javascript:;"
                                    >Edit Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Delete Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Personal Settings</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-body">
                          <p class="mg-t-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some
                            form, by injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                          <div class="row row-sm">
                            <div class="col">
                              <img
                                alt="img"
                                class="wd-200 me-4 my-2"
                                src="../../../assets/img/media/1.jpg"
                              />
                              <img
                                alt="img"
                                class="wd-200 my-2"
                                src="../../../assets/img/media/2.jpg"
                              />
                            </div>
                          </div>
                          <div class="media mg-t-15 profile-footer">
                            <div class="media-user me-2">
                              <div class="demo-avatar-group">
                                <div class="demo-avatar-group main-avatar-list-stacked">
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/12.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/12.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/3.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/5.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/6.jpg"
                                    />
                                  </div>
                                  <div class="main-avatar">+23</div>
                                </div>
                                <!-- demo-avatar-group -->
                              </div>
                              <!-- demo-avatar-group -->
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 mg-t-10">28 people like your photo</h6>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-heart me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-comment me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-share-square"></i
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card mg-b-20 border">
                        <div class="card-header p-4">
                          <div class="media">
                            <div class="media-user me-2">
                              <div class="main-img-user avatar-md">
                                <img
                                  alt=""
                                  class="rounded-circle"
                                  src="../../../assets/img/users/6.jpg"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6>
                              <span class="text-muted ms-2">Sep 26 2019, 10:14am</span>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a
                                  class="new option-dots2 p-2"
                                  data-bs-toggle="dropdown"
                                  href="JavaScript:void(0);"
                                  ><i class="fas fa-ellipsis-v"></i
                                ></a>
                                <div class="dropdown-menu dropdown-menu-end shadow">
                                  <a class="dropdown-item" href="javascript:;"
                                    >Edit Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Delete Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Personal Settings</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-body h-100">
                          <p class="mg-t-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some
                            form, by injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                          <div class="row row-sm">
                            <div class="col">
                              <img
                                alt="img"
                                class="wd-200 me-4 my-2"
                                src="../../../assets/img/media/4.jpg"
                              />
                              <img
                                alt="img"
                                class="wd-200 my-2"
                                src="../../../assets/img/media/5.jpg"
                              />
                            </div>
                          </div>
                          <div class="media mg-t-15 profile-footer">
                            <div class="media-user me-2">
                              <div class="demo-avatar-group">
                                <div class="demo-avatar-group main-avatar-list-stacked">
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/12.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/7.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/2.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/5.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/6.jpg"
                                    />
                                  </div>
                                  <div class="main-avatar">+23</div>
                                </div>
                                <!-- demo-avatar-group -->
                              </div>
                              <!-- demo-avatar-group -->
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 mg-t-10">28 people like your photo</h6>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-heart me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-comment me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-share-square"></i
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card mg-b-20 border">
                        <div class="card-header p-4">
                          <div class="media">
                            <div class="media-user me-2">
                              <div class="main-img-user avatar-md">
                                <img
                                  alt=""
                                  class="rounded-circle"
                                  src="../../../assets/img/users/6.jpg"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6>
                              <span class="text-muted ms-2">Sep 26 2019, 10:14am</span>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a
                                  class="new option-dots2 p-2"
                                  data-bs-toggle="dropdown"
                                  href="JavaScript:void(0);"
                                  ><i class="fas fa-ellipsis-v"></i
                                ></a>
                                <div class="dropdown-menu dropdown-menu-end shadow">
                                  <a class="dropdown-item" href="javascript:;"
                                    >Edit Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Delete Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Personal Settings</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-body h-100">
                          <p class="mg-t-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some
                            form, by injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                          <div class="media mg-t-15 profile-footer">
                            <div class="media-user me-2">
                              <div class="demo-avatar-group">
                                <div class="demo-avatar-group main-avatar-list-stacked">
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/12.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/3.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/4.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/9.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/10.jpg"
                                    />
                                  </div>
                                  <div class="main-avatar">+23</div>
                                </div>
                                <!-- demo-avatar-group -->
                              </div>
                              <!-- demo-avatar-group -->
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 mg-t-10">28 people like your photo</h6>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-heart me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-comment me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-share-square"></i
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card border">
                        <div class="card-header p-4">
                          <div class="media">
                            <div class="media-user me-2">
                              <div class="main-img-user avatar-md">
                                <img
                                  alt=""
                                  class="rounded-circle"
                                  src="../../../assets/img/users/2.jpg"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6>
                              <span class="text-muted ms-2">Sep 26 2019, 10:14am</span>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a
                                  class="new option-dots2 p-2"
                                  data-bs-toggle="dropdown"
                                  href="JavaScript:void(0);"
                                  ><i class="fas fa-ellipsis-v"></i
                                ></a>
                                <div class="dropdown-menu dropdown-menu-end shadow">
                                  <a class="dropdown-item" href="javascript:;"
                                    >Edit Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Delete Post</a
                                  >
                                  <a class="dropdown-item" href="javascript:;"
                                    >Personal Settings</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-body h-100">
                          <p class="mg-t-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some
                            form, by injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                          <div class="row row-sm">
                            <div class="col">
                              <img
                                alt="img"
                                class="wd-200 me-4 my-2"
                                src="../../../assets/img/media/4.jpg"
                              />
                              <img
                                alt="img"
                                class="wd-200 my-2"
                                src="../../../assets/img/media/7.jpg"
                              />
                            </div>
                          </div>
                          <div class="media mg-t-15 profile-footer">
                            <div class="media-user me-2">
                              <div class="demo-avatar-group">
                                <div class="demo-avatar-group main-avatar-list-stacked">
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/11.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/12.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/3.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/4.jpg"
                                    />
                                  </div>
                                  <div class="main-img-user online">
                                    <img
                                      alt=""
                                      class="rounded-circle"
                                      src="../../../assets/img/users/5.jpg"
                                    />
                                  </div>
                                  <div class="main-avatar">+23</div>
                                </div>
                                <!-- demo-avatar-group -->
                              </div>
                              <!-- demo-avatar-group -->
                            </div>
                            <div class="media-body">
                              <h6 class="mb-0 mg-t-10">28 people like your photo</h6>
                            </div>
                            <div class="ms-auto">
                              <div class="dropdown show">
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-heart me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-comment me-3"></i
                                ></a>
                                <a class="new" href="JavaScript:void(0);"
                                  ><i class="far fa-share-square"></i
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- main-profile-body -->
              </div>
            </div>
          </div>
          <div class="main-content-body p-4 border tab-pane border-top-0" id="gallery">
            <Basicgallery />
          </div>
          <div class="main-content-body tab-pane border-top-0" id="friends">
            <div class="card-body border pd-b-10">
              <!-- row -->
              <div class="row row-sm">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/2.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Socrates Itumay
                        </h5></router-link
                      >
                      
                      <p class="mb-2 mt-1 tx-inverse">Project Manager</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/3.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Reynante Labares
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">Web Designer</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/4.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Owen Bongcaras
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">App Developer</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/8.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Stephen Metcalfe
                        </h5></router-link
                      >
                      <p class="mb-2 mt-1 tx-inverse">Administrator</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`">
                          <img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/2.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Socrates Itumay
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">Project Manager</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`">
                          <img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/3.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Reynante Labares
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">Web Designer</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/4.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Owen Bongcaras
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">App Developer</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                  <div class="card custom-card border">
                    <div class="card-body text-center">
                      <div class="user-lock text-center">
                        <div class="dropdown text-end">
                          <a
                            href="javascript:;"
                            class="option-dots"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-message-square me-2"></i> Message</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-edit-2 me-2"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-eye me-2"></i> View</a
                            >
                            <a class="dropdown-item" href="javascript:;"
                              ><i class="fe fe-trash-2 me-2"></i> Delete</a
                            >
                          </div>
                        </div>
                        <router-link :to="`${url}pages/profile`"
                          ><img
                            alt="avatar"
                            class="rounded-circle"
                            src="../../../assets/img/users/8.jpg"
                        /></router-link>
                      </div>
                      <router-link :to="`${url}pages/profile`"
                        ><h5 class="mb-1 mt-3 main-content-label">
                          Stephen Metcalfe
                        </h5></router-link
                      >

                      <p class="mb-2 mt-1 tx-inverse">Administrator</p>
                      <p class="text-muted text-center mt-1">
                        Lorem Ipsum is not simply popular belief Contrary.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-content-body tab-pane p-4 border-top-0" id="settings">
            <div class="card-body border" data-select2-id="12">
              <form class="form-horizontal" data-select2-id="11">
                <div class="mb-4 main-content-label">Account</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">User Name</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="User Name"
                        value="Sonia Taylor"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3">
                      <label class="form-label">Email</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        value="info@SoniaTaylor.in"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group" data-select2-id="108">
                  <div class="row" data-select2-id="107">
                    <div class="col-md-3">
                      <label class="form-label">Language</label>
                    </div>
                    <div class="col-md-9" data-select2-id="106">
                      <Multiselect
                        v-model="value"
                        :options="options"
                        placeholder="Choose one"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group" data-select2-id="10">
                  <div class="row" data-select2-id="9"></div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-3 col">
                      <label class="form-label">Verification</label>
                    </div>
                    <div class="col-md-9 col">
                      <label class="ckbox mg-b-10">
                        <input type="checkbox" /><span>Email</span></label
                      >
                      <label class="ckbox mg-b-10">
                        <input checked="" type="checkbox" /><span>SMS</span></label
                      >
                      <label class="ckbox mg-b-10">
                        <input type="checkbox" /><span>Phone</span></label
                      >
                    </div>
                  </div>
                </div>
                <div class="mb-4 main-content-label">Secuirity Settings</div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-2">
                      <label class="form-label">Login Verification</label>
                    </div>
                    <div class="col-md-10">
                      <a class="" href="javascript:;">Set up Verification</a>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-2">
                      <label class="form-label">Password Verification</label>
                    </div>
                    <div class="col-md-10">
                      <label class="ckbox mg-b-10">
                        <input type="checkbox" /><span
                          >Require Personal Details</span
                        ></label
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row row-sm">
                    <div class="col-md-2"></div>
                    <div class="col-md-10">
                      <a class="mx-sm-3 d-block d-sm-inline-block" href="javascript:;"
                        >Deactivate Account</a
                      >
                      <a class="d-block d-sm-inline-block" href="javascript:;"
                        >Change Password</a
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->
</template>

<script>
import Pageheader from "../../../Shared/Components/Pageheader/Pageheader.vue";
import Basicgallery from "../gallery/Basicgallery.vue";
import Multiselect from "@vueform/multiselect";

export default {
  components: { Basicgallery, Pageheader, Multiselect },
  data() {
    return {
      value: null,
      options: ["Us English", "Arabic", "Korean"],
      url: import.meta.env.BASE_URL,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
