import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
// Icons
import { FaStar } from "react-icons/fa";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper";

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  const dummyReviews = [
    {
      id: 1,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 2,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 3,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 4,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 5,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 6,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 7,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 8,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 9,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 10,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 11,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 12,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    {
      id: 13,
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      course: {
        courseName: "React Fundamentals",
      },
      review: "This course is amazing! I learned a lot.",
      rating: 4.5,
    },
    // Add 19 more dummy reviews...
  ];

  useEffect(() => {
    const getReviews = async () => {
     setReviews(dummyReviews);

    }
    getReviews();
  }, []);

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
              centeredSlides: false,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-sm text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
