<template>
  <div class="select-times">
    <el-radio-group size="medium" v-model="timeType">
      <el-radio-button v-for="(item,index) in radiosArr" :label="item.id" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <el-date-picker
      class="ranges"
      :editable="false"
      :clearable="false"
      range-separator="至"
      v-model="dateRange"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="changeDateRange"
      prefix-icon = "prefix-icon"
    ></el-date-picker>
  </div>

</template>

<script>
import { getDayByTime,parseTime } from '@/utils/index.js'
import store from '@/store'
export default {
  name: 'selectTimes',
  props: ['defaultTime'],
  data(){
    return{
       pickerOptions: {
        onPick :time =>{
              this.searchList.timeOptionRange = time.minDate
        },
        disabledDate :time =>{
              let timeOptionRange = this.searchList.timeOptionRange
              let seven = 3600 * 1000 * 24 * 180
              if(timeOptionRange){
                // /*选择的日期 与 当前日期 小于7天*/
                let current =new Date(new Date().toLocaleDateString()) - timeOptionRange.getTime()

                return (time.getTime() > timeOptionRange.getTime()+ (current < seven?current:seven)-24*60*60*1000 ||
                  time.getTime() < timeOptionRange.getTime()-seven)
              }else {
                return time.getTime() > (Date.now()-24*60*60*1000)
              }
            }
      },
      radiosArr:[
        {id:1,name:'昨天'},
        {id:2,name:'近7天'},
        {id:3,name:'近30天'},
      ],
      timeType:-1,
      dateRange:'',
      updateTime:'',
      searchList:{}
    }
  },
  watch:{
    updateTime(val){
       this.timeType= this.defaultTime?this.defaultTime:1
    },
    timeType(val){
      console.log("timeType",val,this.updateTime)
      if(!this.updateTime){return;}
      let startDate,endDate;
      if(val==1){
        startDate = getDayByTime(this.updateTime,0,true)+ ' 00:00:00'
        endDate = getDayByTime(this.updateTime,0,true) + ' 23:59:59'
      }else if(val==2){
        startDate = getDayByTime(this.updateTime,-6,true)+ ' 00:00:00'
        endDate = getDayByTime(this.updateTime,0,true) + ' 23:59:59'
      }else if(val==3){
        startDate = getDayByTime(this.updateTime,-29,true)+ ' 00:00:00'
        endDate = getDayByTime(this.updateTime,0,true) + ' 23:59:59'
      }
      else if(val==-1){
        startDate = parseTime(this.dateRange[0],'{y}-{m}-{d} {h}:{i}:{s}')
        endDate = parseTime(this.dateRange[1],'{y}-{m}-{d} {h}:{i}:{s}').replace('00:00:00','23:59:59')
      }
      if(val != -1){
      this.dateRange = [new Date(startDate.replace(/-/g,'/')),new Date(endDate.replace(/-/g,'/'))]
      let timeStr = "";
      if (val === 1) timeStr = "昨天";
      else if (val === 2) timeStr = "近7天";
      else if (val === 3) timeStr = "近30天";
      else if (val === -1) {
        if (new Date(startDate.split(' ')[0]).getTime() == new Date(endDate.split(' ')[0]).getTime()) {
          timeStr = `${parseTime(startDate.replace(/-/g,'/'), "{m}/{d}")}`;
        } else {
          timeStr = `${parseTime(startDate.replace(/-/g,'/'), "{m}/{d}") || "~"}-${
            parseTime(endDate.replace(/-/g,'/'), "{m}/{d}") || "~"
          }`;
        }
      }
      this.searchList.timeOptionRange = new Date(startDate.replace(/-/g,'/'))
      this.$emit('dateRangeSearch',{
        timeType:val,
        beginTime:startDate,
        endTime:endDate,
        updateTime:getDayByTime(this.updateTime,0,true),
        timeShowText:timeStr
      })



      }



    },
    // dateRange(newVal){
    //  console.log('dateRange2')





    // },
  },
  async created() {
    if(!this.$store.getters.refreshTime){
      const res = {
        dataUpdateStatus: 2,
        refreshTime: "2022-09-20 16:53:50", 
        lastRefreshTime: null
      }
      this.status = res.data.data.dataUpdateStatus

      /*
      * status ==1 更新中, lastfreshTime
      * status ==2 已完成更新, refreshTIme
      * */
      if(this.status==1){
        this.updateTime = res.data.data.lastRefreshTime
      }else if(this.status==2){
        this.updateTime = res.data.data.refreshTime
      }
      store.dispatch('app/updateRefreshTime', this.updateTime)
      store.dispatch('app/updateRefreshStatus', this.status)
    }else{
      this.updateTime = this.$store.getters.refreshTime;
      this.timeType= this.defaultTime?this.defaultTime:1
    }
    this.updateTime = this.updateTime.replace(/-/g,'/')

  },
  mounted() {},
  beforeDestroy() {
    this.updateTime = ''
  },
  methods:{
    changeDateRange(newVal){
      //  console.log('dateRange3',newVal)
      this.timeType = -1
      let startDate,endDate,val=this.timeType;
      startDate = parseTime(newVal[0],'{y}-{m}-{d} {h}:{i}:{s}')
      endDate = parseTime(newVal[1],'{y}-{m}-{d} {h}:{i}:{s}').replace('00:00:00','23:59:59')
      let timeStr = "";
      if (val === 1) timeStr = "昨天";
      else if (val === 2) timeStr = "近7天";
      else if (val === 3) timeStr = "近30天";
      else if (val === -1) {
        if (new Date(startDate.split(' ')[0]).getTime() == new Date(endDate.split(' ')[0]).getTime()) {
          timeStr = `${parseTime(startDate.replace(/-/g,'/'), "{m}/{d}")}`;
        } else {
          timeStr = `${parseTime(startDate.replace(/-/g,'/'), "{m}/{d}") || "~"}-${
            parseTime(endDate.replace(/-/g,'/'), "{m}/{d}") || "~"
          }`;
        }
      }
      this.$emit('dateRangeSearch',{
        timeType:val,
        beginTime:startDate,
        endTime:endDate,
        updateTime:getDayByTime(this.updateTime,0,true),
        timeShowText:timeStr
      })


    }
  }
}
</script>

<style lang="scss" scoped>
.select-times{
  display: flex;
  align-items: center;
}
/deep/.el-radio-group{
  white-space: nowrap;
  border-radius: 4px;
  margin-right: 18px;
}
/deep/.el-radio-button {
  outline: none;
  width: 82px;
}

</style>

<style lang="scss">
.dark-layout{
  /*日历选择组件  el-range-editor  hch   S*/
  .el-range-editor {
    padding: 0;
    height: 38px;
    line-height: 38px;
    width: 260px;
    border:1px solid;
    @include border_color("input_border");
    @include bg_color("input_bg");
    &.is-active,&.is-active:hover{
      @include border_color("input_border_focus");
      overflow: hidden;
    }
    .el-range-input {
      @include bg_color("input_bg");
      @include font_color("input_font");
    }
    .el-range-separator {
      @include font_color("input_font");
      width: 8%;
    }
    .prefix-icon{
      width: 17px;
      height: 17px;
      background-image: url("https://www1.pcauto.com.cn/zt/gz20220812/qd/csht/images/time-choose.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      right: 20px;
    }
  }
  .el-picker-panel {
    @include bg_color("comm_bg_main");
    @include font_color("input_font");
    @include border_color("input_border");
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
    font-size: 14px;
    width: 539px;
    .el-picker-panel__content{
      padding:0 15px 15px;
    }
    .el-date-range-picker__header{
      height: 37px;
      line-height: 37px;
      border:none;
      position: relative;
      &::after{
        content: "";
        position: absolute;
        left: -15px;
        right: -15px;
        bottom: 1px;
        height: 1px;
        border-bottom: 1px solid;
        @include border_color("input_border");
      }

      .el-picker-panel__icon-btn{
        @include font_color("comm_header_font_grey");
        margin-top:15px;
      }
    }
    .el-date-range-picker__content.is-left{
      border-right: none;
    }
    .el-date-table{
      //font-size: 9.6px;
      border-collapse: separate;
      border-spacing: 0px;
      .in-range div,
      .in-range div:hover,
      &.is-week-mode .el-date-table__row.current div,
      &.is-week-mode .el-date-table__row:hover div{
        @include bg_color("comm_bg_main");
        @include font_color("input_font");
        border-radius: 0;
        border:none;
        padding:0;
        position: relative;
        &::before{
          content: "";
          border-top:1px dashed;
          //border-bottom:1px dashed;
          position: absolute;
          height: 1px;
          top:0;
          left: -4px;
          right: -5px;
          @include border_color("input_border_focus");
        }
        &::after{
          content: "";
          //border-top:1px dashed;
          border-bottom:1px dashed;
          position: absolute;
          height: 1px;
          bottom:0;
          left: -4px;
          right: -5px;
          @include border_color("input_border_focus");
        }
      }

      th{
        @include font_color("input_font");
        border-bottom: none;
        padding:0;
      }
      td{
        box-sizing: border-box;
        border:none;
        padding:0;
        position: relative;
        &:last-child{
          border-right: none;
        }
        &>div{
          margin:0 auto 6px;
          padding:0;
          width: 24px;
          height: 24px;
        }
        &.start-date,&.end-date{
          div,div:hover{
            @include bg_color("input_bg_orange");
            color:#fff;
            border-radius: 4px;
            span{
              background: none;
            }
          }
        }
        &.start-date.end-date>div::before,&.start-date.end-date>div::after{
          border:none!important;
        }
        &.start-date{
          div{
            &:before{
              content: "";
              border-top:1px dashed;
              position: absolute;
              height: 1px;
              top:0;
              left: 20px;
              right: -5px;
              @include border_color("input_border_focus");
            }
            &:after{
              content: "";
              border-bottom:1px dashed;
              position: absolute;
              height: 1px;
              bottom:0;
              left: 20px;
              right: -4px;
              @include border_color("input_border_focus");
            }
          }
        }
        &.end-date{
          div{
            &:before{
              content: "";
              border-top:1px dashed;
              position: absolute;
              height: 1px;
              top:0;
              left: -4px;
              right: 20px;
              @include border_color("input_border_focus");
            }
            &:after{
              content: "";
              border-bottom:1px dashed;
              position: absolute;
              height: 1px;
              bottom:0;
              left: -4px;
              right: 20px;
              @include border_color("input_border_focus");
            }
          }
        }
        &.disabled{
          div{
            @include bg_color("comm_bg_disabled");
            @include font_color("comm_font_disabled");
              position: absolute;
              left: -2px;
              right: -4px;
              top:0;
              width: auto;
              @include bg_color("comm_bg_disabled");
              @include font_color("comm_font_disabled");
            border-radius: 4px;
          }
        }
        &.today.disabled{
          div{
            border:1px solid;
            @include border_color("input_border_focus");
            border-radius: 4px;
            @include bg_color("comm_bg_main");
            position: relative;
            left: 0;
            width: 24px;
            span{
              @include font_color("input_font");
              font-weight: normal;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
  .el-popper[x-placement^=bottom] .popper__arrow{
    display: none;
  }
}

</style>
