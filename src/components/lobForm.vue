<template>
  <q-card>
    <span v-if="lob.value == '4'" class="row">
      <q-card-section class="column col-4 q-gutter-sm">
        <q-input outlined label="CPR" v-model="lobModel.CPR" />
        <q-input outlined label="Plate No." v-model="lobModel.plateNo" />
        <q-input outlined label="Chassis No." v-model="lobModel.chassisNo" />
        <q-select
          v-model="lobModel.product"
          outlined
          label="Product"
          :options="getProducts"
        />
        <q-input outlined label="Make" v-model="lobModel.make" />
        <q-separator />
        <div class="full-width text-center">Period</div>
        <q-input
          label="Start Date"
          outlined
          v-model="lobModel.startDate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="lobModel.startDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="teal" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          label="Expiry Date"
          outlined
          v-model="lobModel.expiryDate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="lobModel.expiryDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="teal" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-separator />
        <q-checkbox v-model="lobModel.isRenewal" label="Renewal" color="teal" />
        <q-input
          v-if="lobModel.isRenewal"
          outlined
          label="Old Policy No."
          v-model="lobModel.oldPolicyNo"
        />
      </q-card-section>
      <q-separator vertical inset/>
      <q-card-section class="column col" style="height: fit-content; padding:0">
        <q-card-section class="row col" style="height: fit-content; padding:0">
          <q-card-section class="column col-6 q-gutter-sm" style="height: fit-content">
            <q-input outlined label="Seats" v-model="lobModel.seats" />
            <q-input outlined label="Year" v-model="lobModel.year" />
            <q-input outlined label="Engine" v-model="lobModel.engine" />
            <q-input outlined label="cc" v-model="lobModel.cc" />
            <q-input outlined label="Note" v-model="lobModel.note" />
          </q-card-section>
          <q-card-section class="column col-6 q-gutter-sm" style="height: fit-content">
            <q-input outlined label="Replace Car" v-model="lobModel.repcar" />
            <q-select
              v-model="lobModel.color"
              outlined
              label="Color"
              :options="getColors"
            />
            <q-input outlined label="Model" v-model="lobModel.model" />
            <q-input outlined label="Driver CPR" v-model="lobModel.driverCPR" />
          </q-card-section>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="column col q-gutter-sm" style="height: fit-content; padding:0">
          <div class="full-width text-center" style="color:gray">Premium</div>
          <q-card-section class="row col" style="height: fit-content; padding:0">
            <q-card-section class="column col-6 q-gutter-sm" style="height: fit-content">
              <q-input label="Sum Insured" outlined v-model="lobModel.sumInsured" />
              <q-input label="Selling" outlined v-model="lobModel.selling" />
              <q-input label="Other Services" outlined v-model="lobModel.otherServices"/>
              <q-input label="Gross" outlined v-model="lobModel.gross" />
              <q-input label="Discount" outlined v-model="lobModel.discount" />
            </q-card-section>
            <q-card-section class="column col-6 q-gutter-sm" style="height: fit-content">
              <q-input label="Gross Vat Invoice" outlined v-model="lobModel.grossVATinvoice"/>
              <q-input label="Excess" outlined v-model="lobModel.excess"/>
              <q-input label="Other Services Discount" outlined v-model="lobModel.otherServicesDiscount"/>
              <q-input label="Other Services Vat" outlined v-model="lobModel.otherServicesVAT"/>
              <q-input label="Gross Vat" outlined v-model="lobModel.grossVAT"/>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </span>
    <div v-else>work on other LOBs</div>
    <q-separator inset />
    <q-card-actions class="row">
      <q-btn class="col" color="negative" label="Cancel" @click="cancel()" />
      <q-btn class="col-6" color="secondary" label="Save" @click="saveTask()" />
    </q-card-actions>
  </q-card>
</template>
<script>
import requestsCommon from "../mixins/requestsCommon";

export default {
  mixins: [requestsCommon],
  props: ["qkey", "lob", "existingLOB"],
  data() {
    return {
      color: null,
      lobModel: {},
    };
  },
  created() {
    let self = this
    if (self.existingLOB) self.lobModel = self.existingLOB;
    else {
      if (self.lob.value == "1") {
        self.lobModel = {}
      } else if (self.lob.value == "2") {
        self.lobModel = {}
      } else if (self.lob.value == "3") {
        self.lobModel = {};
      } else if (self.lob.value == "4") {
        self.lobModel = {
          CPR: "",
          isRenewal: false,
          oldPolicyNo: "",
          plateNo: "",
          chassisNo: "",
          product: null,
          make: "",
          startDate: null,
          expiryDate: null,
          seats: "",
          year: "",
          engine: "",
          cc: "",
          note: "",
          repcar: "",
          color: null,
          model: "",
          driverCPR: "",
          sumInsured: "",
          selling: "",
          otherServices: "",
          gross: "",
          discount: "",
          grossVATinvoice: "",
          excess: "",
          otherServicesDiscount: "",
          otherServicesVAT: "",
          grossVAT: "",
        };
      } else if (self.lob.value == "5") self.lobModel = {};
      else if (self.lob.value == "6") self.lobModel = {};
      else if (self.lob.value == "7") self.lobModel = {};
      else if (self.lob.value == "8") self.lobModel = {};
      else if (self.lob.value == "9") self.lobModel = {};
    }
  },
  methods: {
    saveTask() {
      var self = this;
      self.db
        .ref("/tasks/" + self.qkey + "/lobForm")
        .set(self.lobModel, function (error) {
          if (error) {
            self.fnotify(error.message);
          } else {
            self.snotify("Tasks updated Successfully");
            self.$emit("hideDialog");
          }
          self.hideloading();
        });
    },
    cancel() {
      this.$emit("hideDialog");
    }
  },
  computed: {

    getColors() {
      return [
        { label: "White", value: "1" },
        { label: "Silver", value: "2" },
        { label: "Black", value: "3" },
        { label: "Grey", value: "4" },
        { label: "Blue", value: "5" },
        { label: "Red", value: "6" },
        { label: "Brown", value: "7" },
        { label: "Green", value: "8" },
        { label: "BLUE", value: "9" },
        { label: "PEARL", value: "10" },
        { label: "Maroon", value: "11" },
        { label: "BRONZE", value: "12" },
        { label: "WHITE - BLUE", value: "13" },
        { label: "BEIGE", value: "14" },
        { label: "GOLD", value: "15" },
        { label: "BLACK - WHITE", value: "18" },
        { label: "Yellow", value: "19" },
        { label: "Purple", value: "20" },
        { label: "Orange", value: "16" },
        { label: "MAUVE", value: "17" },
      ]
    },
    getProducts() {
      if (this.lob.value == '1')
        return [
          { label: "Solidarity Home", value: "1004" },
          { label: "Takaful Home", value: "1008" },
          { label: "Commercial SNIC PAR", value: "1010" },
          { label: "Commercial Takaful CAR", value: "1013" },
          { label: "Commercial Takaful PAR", value: "1014" },
          { label: "Commercial Takaful Public Liability", value: "1015" },
          { label: "Commercial BNI PAR", value: "1021" },
          { label: "AXA Fire", value: "1022" },
          { label: "Commercial Medgulf PAR", value: "1027" },
          { label: "Gulf Union Fire", value: "1029" },
          { label: "Tazur Fire", value: "1037" },
          { label: "AXA Commercial CPM", value: "1040" },
          { label: "AXA Commercial Plant All Risk", value: "1041" },
          { label: "AXA Commercial PAR", value: "1045" },
          { label: "BKIC Commercial PAR", value: "1048" },
          { label: "BNI Commercial CAR", value: "1050" },
          { label: "Commercial Takaful CPM", value: "1051" },
          { label: "BNI Commercial CPM", value: "2055" },
          { label: "Tazur Commercial CAR", value: "2057" },
          { label: "AXA Home", value: "2059" },
          { label: "Commercial Medgulf Fire", value: "2064" },
          { label: "Commercial Arabia Property", value: "2065" },
          { label: "Solidarity Commercial PAR", value: "2071" },
          { label: "Gulf Union Home", value: "5087" },
          { label: "BNI PAR - Home", value: "5090" },
          { label: "BKIC Commercial Fire", value: "5091" },
          { label: "Commercial Takaful Machinery Breakdown", value: "5098" },
          { label: "Commercial Arabia CAR", value: "5103" },
          { label: "Solidarity CAR", value: "5122" },
          { label: "Solidarity Fire", value: "5123" },
          { label: "RSA commercial PAR", value: "5138" },
          { label: "BNI Fire", value: "5156" },
        ]
      else if (this.lob.value == '2')
        return [
          { label: "AXA Commercial Marine Cargo All Risk", value: "1002" },
          { label: "Commercial Takaful Marine Hull", value: "1044" },
          { label: "Commercial SNIC Marine", value: "2058" },
          { label: "Commercial Takaful Cargo", value: "2073" },
          { label: "RSA Commercial Marine", value: "5077" },
          { label: "SNIC Marine Hull", value: "5078" },
          { label: "Arabia Marine Hull", value: "5088" },
          { label: "BNI Marine Hull", value: "5107" },
          { label: "Tazur Commercial Cargo", value: "5116" },
          { label: "Solidarity Commercial Cargo", value: "5117" },
          { label: "BNI MARINE CARGO", value: "5133" },
          { label: "AXA Marine Hull", value: "5137" },
        ]
      else if (this.lob.value == '4')
        return [
          { label: "BNI Standard Motor", value: "2" },
          { label: "SAICO Motor Comprehensive", value: "3" },
          { label: "Takaful Motor Comprehensive", value: "5" },
          { label: "SNIC Motor Comprehensive", value: "7" },
          { label: "Solidarity Motor Comprehensive", value: "9" },
          { label: "AXA Motor Comprehensive", value: "11" },
          { label: "Gulf union-Silver plus", value: "1005" },
          { label: "Gulf union-Silver", value: "1006" },
          { label: "Takaful Motor TPL", value: "1009" },
          { label: "MedGulf Motor Insurance", value: "1011" },
          { label: "AXA Motor TPL", value: "1012" },
          { label: "Commercial Motor Takaful Comprehensive", value: "1016" },
          { label: "Commercial Takaful Motor TPL", value: "1017" },
          { label: "Commercial SNIC Motor Comprehensive", value: "1018" },
          { label: "Commercial SNIC Motor TPL", value: "1019" },
          { label: "Gulf union-pearl", value: "1032" },
          { label: "Gulf union-Gold", value: "1033" },
          { label: "Solidarity Motor TPL", value: "1034" },
          { label: "Tazur Comprehensive", value: "1038" },
          { label: "Arabia Motor Comprehensive", value: "2052" },
          { label: "Arabia Motor TP", value: "2061" },
          { label: "Arabia Motor Cycle TP", value: "2066" },
          { label: "Tazur Commercial Motor TP", value: "2068" },
          { label: "Tazur Commercial Motor Comprehensive", value: "2069" },
          { label: "Tazur Motor TP", value: "5079" },
          { label: "Orient Motor Comprehensive", value: "5080" },
          { label: "Orient Motor TPL", value: "5081" },
          { label: "Commercial SAICO Motor Comprehensive", value: "5095" },
          { label: "BKIC Motor Comprehensive", value: "5096" },
          { label: "BNI Motor Comprehensive", value: "5100" },
          { label: "BNI Motor TPL", value: "5101" },
          { label: "AXA Motor Comprehensive - Private Scheme", value: "5105" },
          { label: "Takaful Comprehensive Plus", value: "5106" },
          { label: "AXA NOW - TRANSFER", value: "5108" },
          { label: "AXA Motor TPL - Private Scheme", value: "5109" },
          { label: "BKIC Motor TPL", value: "5111" },
          { label: "RSA Motor Comprehensive", value: "5113" },
          { label: "RSA Motor TPL", value: "5114" },
          { label: "AXA NOW - NCD", value: "5124" },
          { label: "SNIC TPL", value: "5126" },
          { label: "AXA Transfer", value: "5143" },
          { label: "AXA Transfer Related", value: "5144" },
          { label: "Gulf union-Bronze TP", value: "5146" },
          { label: "SAICO Motor TP", value: "5151" },
          { label: "BNI STD Motor", value: "5153" },
          { label: "BKIC NCD", value: "5155" },
          { label: "Partially Fleet Transfer", value: "5158" },
          { label: "Partially Fleet Transfer Related", value: "5159" },
          { label: "Takaful Transfer", value: "5161" },
          { label: "Takaful Transfer Related", value: "5162" },
          { label: "BNL TPL", value: "5163" },
          { label: "BNI Professional Indemnity", value: "5164" },
          { label: "Towergate NCD", value: "5165" },
        ]
    }
  }
};
</script>
