import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AdSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust as per your preference
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="https://cdn.discordapp.com/attachments/792656939573313546/1230467758920175656/image.png?ex=66336d66&is=6620f866&hm=fe3d91e342c1378a71f4e6333c93a41b02f990ef3d0fd042413f9552b8698cf3&" alt="Image 1" />
      </div>
      <div>
        <img src="https://cdn.discordapp.com/attachments/792656939573313546/1230467835415756821/image.png?ex=66336d78&is=6620f878&hm=650b64d2503a0fed3da69ac0c6a7ef2dc0db9ff9b4890b331f31bd54a8a9de9d&" alt="Image 2" />
      </div>
      <div>
        <img src="https://cdn.discordapp.com/attachments/792656939573313546/1230472444582826036/image.png?ex=663371c3&is=6620fcc3&hm=a9aafb5f703e8b9661f150577f004e16de39b34586be9850f5fd6ec119584b4f&" alt="Image 3" />
      </div>
    </Slider>
  );
}

export default AdSlider;