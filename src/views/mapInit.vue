<template>
    <div class="map">
        <div ref="map" class="map-container"></div>
        <span style="display: block;font-size: 0.5rem;color: #843493;padding: 0 15px;">{{address}} </span>
        <van-button type="primary" size="large" @click="click">确认返回</van-button>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "map-init",
  data() {
    return {
        address: '',
        metaData: {
            latitude: '',
            longitude: ''
        }
    };
  },
  props: ['latitude', 'longitude', 'mapAddress'],
  mounted(){
      if(!!this.mapAddress){
          this.address = this.mapAddress;
      }
      if(!!this.latitude){
          this.metaData.latitude = this.latitude;
      }
      if(!!this.longitude){
          this.metaData.longitude = this.longitude;
      }
      this.mapInit();
  },
  methods: {
    ...mapMutations('common', {
      setUser: "setUser"
    }),
    mapInit() {
      navigator.geolocation.getCurrentPosition(
        position => {
          var self = this;
          var map = new qq.maps.Map(this.$refs.map, {
            center: new qq.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            zoom: 13
          });
          var geocoder = new qq.maps.Geocoder({
            complete: function(result) {
              map.setCenter(result.detail.location);
              self.address = result.detail.address;
            }
          });
          if (self.metaData.latitude != "" && self.metaData.longitude != "") {
            var marker = new qq.maps.Marker({
              position: new qq.maps.LatLng(
                parseFloat(self.metaData.latitude),
                parseFloat(self.metaData.longitude)
              ),
              map: map
            });
            geocoder.getAddress(
              new qq.maps.LatLng(
                parseFloat(self.metaData.latitude),
                parseFloat(self.metaData.longitude)
              )
            );
          }
          qq.maps.event.addListener(map, "click", (event) => {
            var lat = parseFloat(event.latLng.lat);
            var lng = parseFloat(event.latLng.lng);
            self.metaData.latitude = lat;
            self.metaData.longitude = lng;
            
            var latLng = new qq.maps.LatLng(lat, lng);
            //调用获取位置方法
            let address = geocoder.getAddress(latLng);
            var marker = new qq.maps.Marker({
              position: event.latLng,
              map: map
            });
            
            qq.maps.event.addListener(map, "click", function(event) {
              marker.setMap(null);
            });
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("您拒绝对获取地理位置的请求");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("位置信息是不可用的");
              break;
            case error.TIMEOUT:
              alert("请求您的地理位置超时");
              break;
            case error.UNKNOWN_ERROR:
              alert("未知错误");
              break;
          }
        }
      );
    },
    click(){
        this.$parent.show = false;
        this.$emit('mapclick', this.address, this.metaData.latitude, this.metaData.longitude)
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.map-container{
    height: calc(100% - 3rem)
}
</style>

