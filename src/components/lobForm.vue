<template>
  <q-card style="min-width: fit-content; min-height: fit-content">
    <span class="row">
      <q-card-section
        :class="
          'column q-gutter-sm ' +
          (checkDetails ? 'col-2' : 'col')
        "
      >
        <div
          :class="'full-width text-center text-h5 text-bold text-' + (lob ? (lob.color + '-4') : 'white')"
          style="color: gray"
        >
          Policy
        </div>
        <q-input
          :color="(lob ? (lob.color + '-4') : 'white')"
          outlined
          label="CPR"
          v-model="CPR"
        />
        <q-select
          :color="(lob ? (lob.color + '-4') : 'white')"
          v-model="lobModel.product"
          outlined
          label="Product"
          :options="getProducts"
        />
        <q-separator :color="(lob ? (lob.color + '-4') : 'white')"/>
        <div
          :class="'full-width text-center q-pt-md text-h6 text-bold text-' + (lob ? (lob.color + '-4') : 'white')"
        >
          Period
        </div>
        <q-input
          :color="(lob ? (lob.color + '-4') : 'white')"
          label="Start Date"
          outlined
          v-model="dates.startDate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" :color="(lob ? (lob.color + '-4') : 'white')">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dates.startDate" :color="(lob ? (lob.color + '-4') : 'white')">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" :color="(lob ? (lob.color + '-4') : 'white')" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          :color="(lob ? (lob.color + '-4') : 'white')"
          label="Expiry Date"
          outlined
          v-model="dates.expiryDate"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" :color="(lob ? (lob.color + '-4') : 'white')">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dates.expiryDate" :color="(lob ? (lob.color + '-4') : 'white')">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" :color="(lob ? (lob.color + '-4') : 'white')" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-separator :color="(lob ? (lob.color + '-4') : 'white')"/>
        <q-checkbox
          :color="(lob ? (lob.color + '-4') : 'white')"
          keep-color
          v-model="renewal.isRenewal"
          label="Renewal"
        />
        <q-input
          v-if="renewal.isRenewal"
          :color="(lob ? (lob.color + '-4') : 'white')"
          outlined
          label="Old Policy No."
          v-model="renewal.oldPolicyNo"
        />
      </q-card-section>
      <q-separator vertical inset :color="(lob ? (lob.color + '-4') : 'white')"/>
      <q-card-section v-if="checkDetails"
        class="row col"
        style="height: fit-content; width: fit-content; padding: 0"
      >
        <div
          :class="'full-width text-center q-pt-md text-h5 text-bold text-' + (lob ? (lob.color + '-4') : 'white')"
        >
          {{ lob.label }}
        </div>
        <q-card-section class="row full-width" v-if="lob.value == '1'">
          <q-card-section class="column col-6 q-gutter-sm">
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Building Fixtures"
              v-model="lobModel.buildingFix"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Jewellery"
              v-model="lobModel.jewel"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Stock"
              v-model="lobModel.stock"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Other"
              v-model="lobModel.other"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Months"
              v-model="lobModel.months"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Total"
              v-model="lobModel.total"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.riskType"
              outlined
              label="Risk Type"
              :options="getRiskTypes"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Risk Addres"
              v-model="lobModel.riskAddress"
            />
          </q-card-section>
          <q-card-section class="column col q-gutter-sm">
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Beneficiary For"
              v-model="lobModel.beneFor" />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Furniture"
              v-model="lobModel.furniture"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Machinery"
              v-model="lobModel.machinery"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Decoration"
              v-model="lobModel.decoration"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Age"
              v-model="lobModel.age"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Amount"
              v-model="lobModel.amount"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Stories"
              v-model="lobModel.stories"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="PML%"
              v-model="lobModel.pml"
            />
          </q-card-section>
        </q-card-section>
        <q-card-section class="column full-width q-gutter-lg" v-if="lob.value == '2'">
          <q-input
            :color="(lob ? (lob.color + '-4') : 'white')"
            outlined
            label="Voyage From"
            v-model="lobModel.voyageFrom"
          />
          <q-input
            :color="(lob ? (lob.color + '-4') : 'white')"
            outlined
            label="Voyage To"
            v-model="lobModel.voyageTo"
          />
        </q-card-section>
        <q-card-section class="row full-width" v-if="lob.value == '4'">
          <q-card-section class="column col-6 q-gutter-sm">
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Seats"
              v-model="lobModel.seats"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Year"
              v-model="lobModel.year"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Engine"
              v-model="lobModel.engine"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="CC"
              v-model="lobModel.cc"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Note"
              v-model="lobModel.note"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Plate No."
              v-model="lobModel.plateNo"
            />
          </q-card-section>
          <q-card-section class="column col q-gutter-sm">
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.repcar"
              outlined
              label="Replace Car"
              :options="getCarRepOpts"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.color"
              outlined
              label="Color"
              :options="getColors"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Model"
              v-model="lobModel.model"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Driver CPR"
              v-model="lobModel.driverCPR"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Chassis No."
              v-model="lobModel.chassisNo"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.fVehicle"
              outlined
              label="Vehicle"
              :options="getVehicles"
            />
          </q-card-section>
        </q-card-section>
        <q-card-section class="row full-width" v-if="lob.value == '6'">
          <q-card-section class="column col-6 q-gutter-sm">
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Seats"
              v-model="lobModel.fSeats"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Year"
              v-model="lobModel.fYear"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Plate No."
              v-model="lobModel.fPlateNo"
            />
          </q-card-section>
          <q-card-section class="column col q-gutter-sm">
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.fRepcar"
              outlined
              label="Replace Car"
              :options="getCarRepOpts"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Model"
              v-model="lobModel.fModel"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Driver CPR"
              v-model="lobModel.fDriverCPR"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Chassis No."
              v-model="lobModel.fChassisNo"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.fVehicle"
              outlined
              label="Vehicle"
              :options="getVehicles"
            />
          </q-card-section>
        </q-card-section>
        <q-card-section class="row full-width" v-if="lob.value == '8'">
          <q-card-section class="column col-6 q-gutter-sm">
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.travelType"
              outlined
              label="Travel Type"
              :options="getTravelTypes"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.policyType"
              outlined
              label="Policy Type"
              :options="getPolicyTypes"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Group Policy Size"
              v-model="lobModel.groupPolicySize"
            />
          </q-card-section>
          <q-card-section class="column col q-gutter-sm">
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Duration"
              v-model="lobModel.duration"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              outlined
              label="Premium"
              v-model="lobModel.premium"
            />
            <q-select
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="lobModel.country"
              outlined
              label="Country"
              :options="getCountries"
            />
          </q-card-section>
        </q-card-section>
        <q-card-section class="column full-width q-gutter-lg" v-if="lob.value == '9'">
          <q-input
            :color="(lob ? (lob.color + '-4') : 'white')"
            outlined
            label="Contract Value"
            v-model="lobModel.contractValue"
          />
          <q-input
            :color="(lob ? (lob.color + '-4') : 'white')"
            outlined
            label="Amount Of Bond"
            v-model="lobModel.amountOfBond"
          />
        </q-card-section>
        <q-card-section v-else class="row full-width"> </q-card-section>
      </q-card-section>
      <q-separator vertical inset :color="(lob ? (lob.color + '-4') : 'white')"/>
      <q-card-section
        class="column col-2 q-gutter-sm"
        style="height: fit-content; width: fit-content; padding: 0"
      >
        <div
          :class="'full-width text-center q-pt-md text-h5 text-bold text-' + (lob ? (lob.color + '-4') : 'white')"
        >
          Premium
        </div>
        <q-card-section
          class="row col"
          style="height: fit-content; width: fit-content; padding: 0"
        >
          <q-card-section
            class="column col-6 q-gutter-sm"
          >
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Sum Insured"
              outlined
              v-model="premium.sumInsured"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Selling"
              outlined
              v-model="premium.selling"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Other Services"
              outlined
              v-model="premium.otherServices"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Gross"
              outlined
              v-model="premium.gross"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Discount"
              outlined
              v-model="premium.discount"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Premium Rate"
              outlined
              v-model="premium.premiumRate"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Commission Rate"
              outlined
              v-model="premium.commRate"
            />
          </q-card-section>
          <q-card-section
            class="column col-6 q-gutter-sm"
            style="height: fit-content; width: fit-content"
          >
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Gross Vat Invoice"
              outlined
              v-model="premium.grossVATinvoice"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Excess"
              outlined
              v-model="premium.excess"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Other Services Discount"
              outlined
              v-model="premium.otherServicesDiscount"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Other Services Vat"
              outlined
              v-model="premium.otherServicesVAT"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Gross Vat"
              outlined
              v-model="premium.grossVAT"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Commission"
              outlined
              v-model="premium.commission"
            />
            <q-input
              :color="(lob ? (lob.color + '-4') : 'white')"
              label="Commission Deduction"
              outlined
              v-model="premium.commDeduction"
            />
          </q-card-section>
          <q-card-actions class="full-width">
            <q-select
              class="full-width"
              :color="(lob ? (lob.color + '-4') : 'white')"
              v-model="premium.payment"
              outlined
              label="Payment"
              :options="getPayments"
            />
          </q-card-actions>
      </q-card-section>
      </q-card-section>
    </span>
    <q-separator inset :color="(lob ? (lob.color + '-4') : 'white')"/>
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
  props: [
    "qkey",
    "obj",
    "lob",
    "existingLOB",
    "existingPremium",
    "existingDates",
    "existingRenewal",
    "existingCPR",
  ],
  data() {
    return {
      color: null,
      lobModel: {},
      premium: {},
      dates: {},
      renewal: {},
      CPR: {},
    };
  },
  watch: {
    'lob.value': function(newVal) {
      this.updateLobModel(newVal);
    }
  },
  created() {
    let self = this;
    if (self.existingLOB) self.lobModel = self.existingLOB;
    else this.updateLobModel(self.lob.value)
    if (self.existingPremium) self.premium = self.existingPremium;
    else
      self.premium = {
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
        premiumRate: "",
        payment: null,
        commission: "",
        commDeduction: "",
        commRate: ""
      };
    if (self.existingDates) self.dates = self.existingDates;
    else
      self.dates = {
        startDate: null,
        expiryDate: null,
      };
    if (self.existingRenewal) self.renewal = self.existingRenewal;
    else
      self.renewal = {
        isRenewal: false,
        oldPolicyNo: "",
      };
    if (self.existingCPR) self.CPR = self.existingCPR;
    else self.CPR = "";
  },
  methods: {
    updateLobModel(lobi) {
      if (lobi == "1") {
        this.lobModel = {
          beneFor: "",
          buildingFix: "",
          jewel: "",
          stock: "",
          other: "",
          months: "",
          total: "",
          riskType: "",
          riskAddress: "",
          furniture: "",
          machinery: "",
          decoration: "",
          age: "",
          amount: "",
          stories: "",
          pml: ""
        };
      } else if (lobi == "2") {
        this.lobModel = {
          voyageFrom: "",
          voyageTo: "",
        };
      } else if (lobi == "4") {
        this.lobModel = {
          plateNo: "",
          chassisNo: "",
          vehicle: "",
          seats: "",
          year: "",
          engine: "",
          cc: "",
          repcar: null,
          color: null,
          model: "",
          driverCPR: "",
        };
      } else if (lobi == "6") {
        this.lobModel = {
          fPlateNo: "",
          fChassisNo: "",
          fVehicle: null,
          fSeats: "",
          fYear: "",
          fRepcar: null,
          fColor: null,
          fModel: "",
          fDriverCPR: "",
        };
      } else if (lobi == "8") {
        this.lobModel = {
          travelType: null,
          policyType: null,
          groupPolicySize: "",
          duration: "",
          premium: "",
          country: null,
        };
      } else if (lobi == "9") {
        this.lobModel = {
          contractValue: "",
          amountOfBond: "",
        };
      } else {
        this.lobModel = {};
      }

      // Add beneficiary field if lobi is not 7 or 9
      if (!(lobi == "7" || lobi == "9")) {
        this.lobModel = { ...this.lobModel, beneficiary: null };
      }
    },
    async saveTask() {
      var self = this;
      self.obj.lobForm = self.lobModel,
      self.obj.premium = self.premium,
      self.obj.dates = self.dates,
      self.obj.renewal = self.renewal,
      self.obj.cpr = self.CPR,
      await self.db
        .ref("/tasks/" + self.qkey)
        .set(self.obj, function (error) {
          if (error) {
            self.fnotify(error.message);
            state = false;
          }
          else {
            self.snotify("Tasks updated Successfully");
            self.$emit("hideDialog");
            self.hideloading();
          }
        });

    },
    cancel() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    checkDetails() {
      let lobi = this.lob.value
      return !(lobi == '3' || lobi == '5' || lobi == '7')
    },
    getProducts() {
      let lobi = this.lob.value
      if (lobi == '1')
        return [
          { label: 'Solidarity Home', value: '1004' },
          { label: 'Takaful Home', value: '1008' },
          { label: 'Commercial SNIC PAR', value: '1010' },
          { label: 'Commercial Takaful CAR', value: '1013' },
          { label: 'Commercial Takaful PAR', value: '1014' },
          { label: 'Commercial Takaful Public Liability', value: '1015' },
          { label: 'Commercial BNI PAR', value: '1021' },
          { label: 'AXA Fire', value: '1022' },
          { label: 'Commercial Medgulf PAR', value: '1027' },
          { label: 'Gulf Union Fire', value: '1029' },
          { label: 'Tazur Fire', value: '1037' },
          { label: 'AXA Commercial CPM', value: '1040' },
          { label: 'AXA Commercial Plant All Risk', value: '1041' },
          { label: 'AXA Commercial PAR', value: '1045' },
          { label: 'BKIC Commercial PAR', value: '1048' },
          { label: 'BNI Commercial CAR', value: '1050' },
          { label: 'Commercial Takaful CPM', value: '1051' },
          { label: 'BNI Commercial CPM', value: '2055' },
          { label: 'Tazur Commercial CAR', value: '2057' },
          { label: 'AXA Home', value: '2059' },
          { label: 'Commercial Medgulf Fire', value: '2064' },
          { label: 'Commercial Arabia Property', value: '2065' },
          { label: 'Solidarity Commercial PAR', value: '2071' },
          { label: 'Gulf Union Home', value: '5087' },
          { label: 'BNI PAR - Home', value: '5090' },
          { label: 'BKIC Commercial Fire', value: '5091' },
          { label: 'Commercial Takaful Machinery Breakdown', value: '5098' },
          { label: 'Commercial Arabia CAR', value: '5103' },
          { label: 'Solidarity CAR', value: '5122' },
          { label: 'Solidarity Fire', value: '5123' },
          { label: 'RSA commercial PAR', value: '5138' },
          { label: 'BNI Fire', value: '5156' }
        ]
      else if (lobi == '2')
        return [
          { label: 'AXA Commercial Marine Cargo All Risk', value: '1002' },
          { label: 'Commercial Takaful Marine Hull', value: '1044' },
          { label: 'Commercial SNIC Marine', value: '2058' },
          { label: 'Commercial Takaful Cargo', value: '2073' },
          { label: 'RSA Commercial Marine', value: '5077' },
          { label: 'SNIC Marine Hull', value: '5078' },
          { label: 'Arabia Marine Hull', value: '5088' },
          { label: 'BNI Marine Hull', value: '5107' },
          { label: 'Tazur Commercial Cargo', value: '5116' },
          { label: 'Solidarity Commercial Cargo', value: '5117' },
          { label: 'BNI MARINE CARGO', value: '5133' },
          { label: 'AXA Marine Hull', value: '5137' }
        ]
      else if (lobi == '3')
        return [
        { label: 'SAICO Medical', value:'4' },
        { label: 'Takaful Medical', value:'6' },
        { label: 'SNIC Medical', value:'8' },
        { label: 'Solidarity Medical', value:'10' },
        { label: 'AXA Medical', value:'12' },
        { label: 'BKIC Medical', value:'2074' },
        { label: 'Arabia Medical', value:'4075' },
        { label: 'Orient Medical', value:'5110' },
        { label: 'BNI Medical', value:'5127' },
        { label: 'BNL Medical', value:'5128' },
        { label: 'Gulf Union Group Medical', value:'5132' },
        { label: 'Gulf Union Medical', value:'5152' }
        ]
      else if (lobi == '4')
        return [
          { label: 'BNI Standard Motor', value: '2' },
          { label: 'SAICO Motor Comprehensive', value: '3' },
          { label: 'Takaful Motor Comprehensive', value: '5' },
          { label: 'SNIC Motor Comprehensive', value: '7' },
          { label: 'Solidarity Motor Comprehensive', value: '9' },
          { label: 'AXA Motor Comprehensive', value: '11' },
          { label: 'Gulf union-Silver plus', value: '1005' },
          { label: 'Gulf union-Silver', value: '1006' },
          { label: 'Takaful Motor TPL', value: '1009' },
          { label: 'MedGulf Motor Insurance', value: '1011' },
          { label: 'AXA Motor TPL', value: '1012' },
          { label: 'Commercial Motor Takaful Comprehensive', value: '1016' },
          { label: 'Commercial Takaful Motor TPL', value: '1017' },
          { label: 'Commercial SNIC Motor Comprehensive', value: '1018' },
          { label: 'Commercial SNIC Motor TPL', value: '1019' },
          { label: 'Gulf union-pearl', value: '1032' },
          { label: 'Gulf union-Gold', value: '1033' },
          { label: 'Solidarity Motor TPL', value: '1034' },
          { label: 'Tazur Comprehensive', value: '1038' },
          { label: 'Arabia Motor Comprehensive', value: '2052' },
          { label: 'Arabia Motor TP', value: '2061' },
          { label: 'Arabia Motor Cycle TP', value: '2066' },
          { label: 'Tazur Commercial Motor TP', value: '2068' },
          { label: 'Tazur Commercial Motor Comprehensive', value: '2069' },
          { label: 'Tazur Motor TP', value: '5079' },
          { label: 'Orient Motor Comprehensive', value: '5080' },
          { label: 'Orient Motor TPL', value: '5081' },
          { label: 'Commercial SAICO Motor Comprehensive', value: '5095' },
          { label: 'BKIC Motor Comprehensive', value: '5096' },
          { label: 'BNI Motor Comprehensive', value: '5100' },
          { label: 'BNI Motor TPL', value: '5101' },
          { label: 'AXA Motor Comprehensive - Private Scheme', value: '5105' },
          { label: 'Takaful Comprehensive Plus', value: '5106' },
          { label: 'AXA NOW - TRANSFER', value: '5108' },
          { label: 'AXA Motor TPL - Private Scheme', value: '5109' },
          { label: 'BKIC Motor TPL', value: '5111' },
          { label: 'RSA Motor Comprehensive', value: '5113' },
          { label: 'RSA Motor TPL', value: '5114' },
          { label: 'AXA NOW - NCD', value: '5124' },
          { label: 'SNIC TPL', value: '5126' },
          { label: 'AXA Transfer', value: '5143' },
          { label: 'AXA Transfer Related', value: '5144' },
          { label: 'Gulf union-Bronze TP', value: '5146' },
          { label: 'SAICO Motor TP', value: '5151' },
          { label: 'BNI STD Motor', value: '5153' },
          { label: 'BKIC NCD', value: '5155' },
          { label: 'Partially Fleet Transfer', value: '5158' },
          { label: 'Partially Fleet Transfer Related', value: '5159' },
          { label: 'Takaful Transfer', value: '5161' },
          { label: 'Takaful Transfer Related', value: '5162' },
          { label: 'BNL TPL', value: '5163' },
          { label: 'BNI Professional Indemnity', value: '5164' },
          { label: 'Towergate NCD', value: '5165' }
        ]
      else if (lobi == '5')
        return [
          { label: 'Takaful Group Life', value:'1007' },
          { label: 'Al Hilal Life', value:'5104' },
          { label: 'SOLIDARITY GROUP LIFE', value:'5154' }
        ]
      else if (lobi == '6')
        return [
          { label: 'AXA Motor Fleet', value:'2051' },
          { label: 'Tazur Commercial Motor Fleet', value:'2067' },
          { label: 'Commercial Takaful Motor Fleet', value:'5083' },
          { label: 'Orient Motor Fleet', value:'5097' },
          { label: 'SOLIDARITY MOTOR FLEET', value:'5115' },
          { label: 'BNI Motor Fleet', value:'5121' },
          { label: 'RSA Motor Fleet', value:'5125' },
          { label: 'TAKAFUL MOTOR FLEET', value:'5130' },
          { label: 'BKIC Motor Fleet', value:'5145' },
          { label: 'GULF UNION MOTOR FLEET', value:'5148' }
        ]
      else if (lobi == '7')
        return [
          { label: 'BNI Liability', value: '1003' },
          { label: 'BNI Domestic Servant', value: '1020' },
          { label: 'Commercial Takaful Money', value: '1023' },
          { label: 'Commercial Takaful Fidelity Guarantee', value: '1024' },
          { label: 'Commercial Medgulf Fidelity Guarantee', value: '1025' },
          { label: 'Commercial Medgulf Money', value: '1026' },
          { label: 'Commercial Medgulf Public Liability', value: '1028' },
          { label: 'Takaful Family Protection Plan', value: '1039' },
          { label: 'Commercial SNIC PL', value: '1042' },
          { label: 'Tazur Domestic Servants', value: '1043' },
          { label: 'AXA Commercial PL', value: '1046' },
          { label: 'AXA Commercial Sabortage and Terrorism', value: '1047' },
          { label: 'BKIC Commercial Business Interruption', value: '1049' },
          { label: 'Commercial Medgulf Professional Indemnity', value: '2053' },
          { label: 'BNI Trader’s Combined', value: '2054' },
          { label: 'Commercial Takaful Professional Indemnity', value: '2056' },
          { label: 'Commercial Arabia Professional Indemnity', value: '2062' },
          { label: 'Tazur Commercial Carrier Liability', value: '2063' },
          { label: 'Solidarity Commercial PL', value: '2070' },
          { label: 'Commercial SNIC CAR', value: '2072' },
          { label: 'BKIC Commercial Professional Liability', value: '3074' },
          { label: 'BKIC Commercial Public Liability', value: '3075' },
          { label: 'BKIC Commercial Employer’s Liability', value: '3076' },
          { label: 'BKIC Commercial Fidelity Guarantee', value: '3077' },
          { label: 'Arabia Annual Life', value: '4076' },
          { label: 'Commercial Orient Professional Indemnity', value: '5076' },
          { label: 'Commercial Takaful Employer\'s Liability', value: '5082' },
          { label: 'Tazur Performance Bond', value: '5084' },
          { label: 'Commercial Arabia Terrorism and Sabotage Insurance', value: '5085' },
          { label: 'Medgulf Personal Accident', value: '5086' },
          { label: 'Commercial Takaful Terrorism and Sabotage Insurance', value: '5089' },
          { label: 'Arabia Liability', value: '5092' },
          { label: 'Tazur Commercial CAR', value: '5093' },
          { label: 'BKIC Commercial Money', value: '5094' },
          { label: 'SNIC Group Life', value: '5099' },
          { label: 'Takaful Commercial Public Liability', value: '5102' },
          { label: 'AXA Personal Accident', value: '5112' },
          { label: 'GIG Gulf Employers Liability', value: '5118' },
          { label: 'BKIC Cyber Insurance', value: '5129' },
          { label: 'Solidarity Bond', value: '5131' },
          { label: 'Takaful Group Personal Accident', value: '5134' },
          { label: 'Solidarity Personal Accident', value: '5135' },
          { label: 'Takaful Tender Bond', value: '5136' },
          { label: 'BNI Sabotage and Terrorism', value: '5139' },
          { label: 'RSA Public Liability', value: '5140' },
          { label: 'SOLIDARITY Professional Indemnity', value: '5142' },
          { label: 'SNIC PERSONAL ACCIDENT', value: '5147' },
          { label: 'SOLIDARITY EMPLOYERS LIABILITY', value: '5149' },
          { label: 'AXA Carriers Liability', value: '5150' },
          { label: 'BNI MEDICAL MALPRACTICE', value: '5157' }
        ]
      else if (lobi == '8')
        return [
          { label: 'AXA Travel', value:'1031' },
          { label: 'AXA Travel Schengen', value:'1035' },
          { label: 'Takaful Travel', value:'1036' },
          { label: 'Orient Travel', value:'2060' },
          { label: 'Arabia Travel', value:'5119' },
          { label: 'Medgulf Travel', value:'5120' },
          { label: 'BNI Travel', value:'5141' },
          { label: 'SNIC Travel', value:'5160' },
        ]
      else if (lobi == '9')
        return [ { label: 'Takaful Performance Bond', value:'1030' } ]
    },
    getPayments() {
      return [
        { label:'No', value:'1' },
        { label:'Yes', value:'2' },
        { label:'Partial', value:'3' }
      ]
    },
    getColors() {
      return [
        { label: 'White', value: '1' },
        { label: 'Silver', value: '2' },
        { label: 'Black', value: '3' },
        { label: 'Grey', value: '4' },
        { label: 'Blue', value: '5' },
        { label: 'Red', value: '6' },
        { label: 'Brown', value: '7' },
        { label: 'Green', value: '8' },
        { label: 'BLUE', value: '9' },
        { label: 'PEARL', value: '10' },
        { label: 'Maroon', value: '11' },
        { label: 'BRONZE', value: '12' },
        { label: 'WHITE - BLUE', value: '13' },
        { label: 'BEIGE', value: '14' },
        { label: 'GOLD', value: '15' },
        { label: 'BLACK - WHITE', value: '18' },
        { label: 'Yellow', value: '19' },
        { label: 'Purple', value: '20' },
        { label: 'Orange', value: '16' },
        { label: 'MAUVE', value: '17' },
      ];
    },
    getCarRepOpts() {
      return [
        { label:'No', value:'1' },
        { label:'Yes', value:'2' },
      ]
    },
    getVehicles() {
      return [
        { label: 'ABI', value:'106100' },
        { label: 'Acura', value:'103400' },
        { label: 'Admiral', value:'112300' },
        { label: 'Alfa Romeo', value:'160200' },
        { label: 'American', value:'210000' },
        { label: 'Aprilia', value:'103900' },
        { label: 'Ashkosh', value:'960500' },
        { label: 'Ashok Leyland', value:'190100' },
        { label: 'Asia', value:'130400' },
        { label: 'Aston Martin', value:'206000' },
        { label: 'Astra', value:'114001' },
        { label: 'ATLAS', value:'209700' },
        { label: 'Audi', value:'120600' },
        { label: 'Ausa', value:'103600' },
        { label: 'BAIC', value:'1000025' },
        { label: 'BAICE', value:'1000000' },
        { label: 'Bajaj', value:'102600' },
        { label: 'Beaver', value:'104600' },
        { label: 'Bedford', value:'209100' },
        { label: 'Belarus', value:'960700' },
        { label: 'Bentley', value:'980700' },
        { label: 'Benzhou', value:'112800' },
        { label: 'Blac', value:'960900' },
        { label: 'BMW', value:'120200' },
        { label: 'Bobcat', value:'111200' },
        { label: 'BOMAG', value:'982000' },
        { label: 'Boss', value:'961000' },
        { label: 'Buell', value:'990200' },
        { label: 'Bugatti', value:'104800' },
        { label: 'Buick', value:'110900' },
        { label: 'BYD', value:'105500' },
        { label: 'Caddy', value:'961100' },
        { label: 'Cadillac', value:'110500' },
        { label: 'CAMRY', value:'1000002' },
        { label: 'Can-Am', value:'107400' },
        { label: 'Canter', value:'961200' },
        { label: 'Case', value:'103800' },
        { label: 'Caterham', value:'105600' },
        { label: 'Caterpiller', value:'110400' },
        { label: 'CHANG JIANG', value:'1000032' },
        { label: 'CHANGAN', value:'1000008' },
        { label: 'Cheng Gong', value:'101500' },
        { label: 'Chery', value:'112400' },
        { label: 'Chevrolet', value:'110200' },
        { label: 'chevrolet', value:'1000019' },
        { label: 'CHEVROLET', value:'1000023' },
        { label: 'Chrysler', value:'110600' },
        { label: 'Citroen', value:'150300' },
        { label: 'Clark', value:'961500' },
        { label: 'CMC', value:'197000' },
        { label: 'Cygnus', value:'113800' },
        { label: 'Dacia', value:'961700' },
        { label: 'Daewoo', value:'130200' },
        { label: 'DAF', value:'102004' },
        { label: 'Daihatsu', value:'100900' },
        { label: 'Daimler', value:'961800' },
        { label: 'Datsun', value:'120000' },
        { label: 'Demag', value:'991000' },
        { label: 'Dodge', value:'111000' },
        { label: 'Dongfeng', value:'962000' },
        { label: 'Doosan', value:'111900' },
        { label: 'Ducati', value:'980600' },
        { label: 'Dynapac', value:'102800' },
        { label: 'EADO', value:'1000031' },
        { label: 'Eicher', value:'980502' },
        { label: 'Eight Ball', value:'980800' },
        { label: 'Falcon', value:'160900' },
        { label: 'Faw', value:'140700' },
        { label: 'Fenwick', value:'962300' },
        { label: 'Ferguson', value:'962400' },
        { label: 'Ferrari', value:'150600' },
        { label: 'Fiat', value:'160100' },
        { label: 'Fisker', value:'112900' },
        { label: 'Foden', value:'103000' },
        { label: 'Ford', value:'110100' },
        { label: 'Forklift', value:'999000' },
        { label: 'FORTUNER', value:'1000004' },
        { label: 'Foton', value:'203000' },
        { label: 'Freightliner', value:'102400' },
        { label: 'Fun', value:'962700' },
        { label: 'Furukawa', value:'209600' },
        { label: 'FUSO', value:'1000007' },
        { label: 'Futian', value:'962900' },
        { label: 'Fxd', value:'963000' },
        { label: 'GAC', value:'108500' },
        { label: 'GAC Gonow', value:'108000' },
        { label: 'Gec', value:'963100' },
        { label: 'Geely', value:'101200' },
        { label: 'Genbi', value:'170200' },
        { label: 'GENESIS', value:'1000027' },
        { label: 'Genie', value:'105700' },
        { label: 'GMC', value:'110300' },
        { label: 'GMC', value:'1000016' },
        { label: 'GMC', value:'1000017' },
        { label: 'GMC', value:'1000018' },
        { label: 'Golden Dragon', value:'204000' },
        { label: 'Gonow', value:'989000' },
        { label: 'Great Wall', value:'980501' },
        { label: 'Grove', value:'196000' },
        { label: 'Hafei', value:'963400' },
        { label: 'HAMM', value:'160800' },
        { label: 'Hangchar', value:'113100' },
        { label: 'Haojue', value:'107500' },
        { label: 'Harley Davidson', value:'980400' },
        { label: 'Haulotte', value:'1000005' },
        { label: 'HAVAL', value:'1000010' },
        { label: 'Haval', value:'1000011' },
        { label: 'HAVAL', value:'1000012' },
        { label: 'Heli', value:'104500' },
        { label: 'Hennessey', value:'112500' },
        { label: 'Hero', value:'113700' },
        { label: 'Hindustan', value:'107000' },
        { label: 'Hino', value:'150400' },
        { label: 'Hitachi', value:'140900' },
        { label: 'Hofmann', value:'963900' },
        { label: 'Holand', value:'964000' },
        { label: 'Holder', value:'964100' },
        { label: 'honda', value:'1000013' },
        { label: 'honda', value:'1000014' },
        { label: 'Honda', value:'100300' },
        { label: 'Houster', value:'964300' },
        { label: 'Hummer', value:'981000' },
        { label: 'Hunter', value:'1000024' },
        { label: 'Hw-Lift', value:'112200' },
        { label: 'Hydra', value:'964400' },
        { label: 'Hyosung', value:'102300' },
        { label: 'Hyster', value:'111700' },
        { label: 'Hyundai', value:'130100' },
        { label: 'HYUNDAI', value:'1000021' },
        { label: 'Indian', value:'170300' },
        { label: 'Infiniti', value:'101100' },
        { label: 'Ingersoll Rand', value:'114100' },
        { label: 'International', value:'111800' },
        { label: 'Iran Khodra', value:'980900' },
        { label: 'Ironfairy', value:'964600' },
        { label: 'Isuzu', value:'100800' },
        { label: 'Iveco', value:'160300' },
        { label: 'JAC', value:'198000' },
        { label: 'Jaguar', value:'111300' },
        { label: 'JBC', value:'106800' },
        { label: 'JCB', value:'130700' },
        { label: 'Jeep', value:'110700' },
        { label: 'Jensen', value:'108100' },
        { label: 'Jinbei', value:'102001' },
        { label: 'JLG', value:'107700' },
        { label: 'JMC', value:'120900' },
        { label: 'Jonway', value:'103100' },
        { label: 'Kalmar', value:'106200' },
        { label: 'Kato', value:'160400' },
        { label: 'Kawasaki', value:'980100' },
        { label: 'Kenworth', value:'101800' },
        { label: 'Kia', value:'130300' },
        { label: 'Kinetic', value:'993000' },
        { label: 'King Long', value:'103300' },
        { label: 'Kobilco', value:'130600' },
        { label: 'koenigsegg', value:'130900' },
        { label: 'Komatsu', value:'170400' },
        { label: 'Korando', value:'964800' },
        { label: 'Koremoto', value:'106400' },
        { label: 'Krupp', value:'101400' },
        { label: 'KTM', value:'104400' },
        { label: 'KYMCO', value:'150800' },
        { label: 'Lada', value:'965000' },
        { label: 'Laforza', value:'965100' },
        { label: 'Lamborghini', value:'130000' },
        { label: 'Land Rover', value:'180100' },
        { label: 'Langfang', value:'112100' },
        { label: 'Lesham', value:'965300' },
        { label: 'Lexus', value:'101000' },
        { label: 'Leyland', value:'102000' },
        { label: 'Liebherr', value:'160500' },
        { label: 'Lifan', value:'106300' },
        { label: 'Lincoln', value:'986000' },
        { label: 'Linde', value:'965400' },
        { label: 'Lindy', value:'996000' },
        { label: 'Locatelli', value:'113400' },
        { label: 'Locomotive', value:'995000' },
        { label: 'Longgong Shanghai', value:'106500' },
        { label: 'Lorain', value:'102700' },
        { label: 'Lotus', value:'997000' },
        { label: 'Luling', value:'193000' },
        { label: 'Mack', value:'101300' },
        { label: 'Mahindra', value:'195000' },
        { label: 'Man', value:'180300' },
        { label: 'Maserati', value:'140400' },
        { label: 'MAXIMA', value:'1000003' },
        { label: 'Maxus', value:'108300' },
        { label: 'MAYBACH', value:'207000' },
        { label: 'Mazda', value:'100600' },
        { label: 'McLaren', value:'111600' },
        { label: 'Mercedes', value:'120100' },
        { label: 'Mercury', value:'194000' },
        { label: 'MG', value:'106600' },
        { label: 'Mini', value:'192000' },
        { label: 'Mitsubishi', value:'100400' },
        { label: 'Mitsuoka', value:'103700' },
        { label: 'Monaco', value:'113300' },
        { label: 'Moto Guzzi', value:'102900' },
        { label: 'Mustang', value:'105200' },
        { label: 'Neoplan', value:'965800' },
        { label: 'New Holland', value:'990000' },
        { label: 'NISSAN', value:'1000020' },
        { label: 'Nissan', value:'100200' },
        { label: 'Nissan', value:'1000026' },
        { label: 'Noble', value:'104000' },
        { label: 'Oldsmobile', value:'110800' },
        { label: 'Opel', value:'120300' },
        { label: 'Orion', value:'965900' },
        { label: 'Oshkosh', value:'966000' },
        { label: 'P &amp; H', value:'102006' },
        { label: 'Pendini', value:'113200' },
        { label: 'Pene', value:'990100' },
        { label: 'Peugeot', value:'150100' },
        { label: 'PGO', value:'105100' },
        { label: 'Plymouth', value:'107300' },
        { label: 'Polarsun', value:'112000' },
        { label: 'Pontiac', value:'111100' },
        { label: 'Porsche', value:'120500' },
        { label: 'PPM', value:'998000' },
        { label: 'Proton', value:'111400' },
        { label: 'Qihdona', value:'105300' },
        { label: 'RABA', value:'100110' },
        { label: 'RAM', value:'1000009' },
        { label: 'Range Rover', value:'980500' },
        { label: 'Renault', value:'150200' },
        { label: 'Revcon', value:'104700' },
        { label: 'RHINO', value:'209400' },
        { label: 'Riya', value:'112700' },
        { label: 'Rolls Royce', value:'180200' },
        { label: 'Rover', value:'150900' },
        { label: 'Royal Enfield', value:'980300' },
        { label: 'Ruston', value:'966700' },
        { label: 'Saab', value:'140200' },
        { label: 'Sachs', value:'113600' },
        { label: 'SAIC', value:'1000015' },
        { label: 'Saleen', value:'104900' },
        { label: 'Sany', value:'108200' },
        { label: 'Sanyang', value:'104300' },
        { label: 'Scammell', value:'967000' },
        { label: 'Scania', value:'140300' },
        { label: 'Scion', value:'103200' },
        { label: 'Seat', value:'170100' },
        { label: 'Semi Trailer', value:'104200' },
        { label: 'SETRA', value:'1001037' },
        { label: 'Shantui', value:'107100' },
        { label: 'Shelby', value:'105400' },
        { label: 'Silla', value:'967300' },
        { label: 'Simon', value:'967400' },
        { label: 'Sisu', value:'967500' },
        { label: 'Skid', value:'967600' },
        { label: 'Skoda', value:'120700' },
        { label: 'Smart', value:'180900' },
        { label: 'Ssangyong', value:'130500' },
        { label: 'SSANGYONG', value:'1000028' },
        { label: 'Steinbock', value:'967800' },
        { label: 'Sterling', value:'103500' },
        { label: 'Subaru', value:'100700' },
        { label: 'Sumitomo', value:'105800' },
        { label: 'Suzuki', value:'100500' },
        { label: 'Tadano', value:'150700' },
        { label: 'Tailift', value:'108400' },
        { label: 'TAMROCK RANGER', value:'209800' },
        { label: 'Taotao', value:'105900' },
        { label: 'TATA', value:'111500' },
        { label: 'Tatra', value:'967900' },
        { label: 'TAZZARI', value:'113500' },
        { label: 'TCM', value:'100210' },
        { label: 'Terberg', value:'968100' },
        { label: 'Terex', value:'992000' },
        { label: 'Tesla', value:'994000' },
        { label: 'TGB', value:'107200' },
        { label: 'Thomas', value:'968200' },
        { label: 'Thwaites', value:'968300' },
        { label: 'Tianma', value:'102200' },
        { label: 'TIIDA', value:'1000001' },
        { label: 'Tipper', value:'968400' },
        { label: 'Tough Customs', value:'199000' },
        { label: 'Toyota', value:'100100' },
        { label: 'TOYOTA', value:'1000022' },
        { label: 'Trade Plate', value:'999999' },
        { label: 'Trans', value:'191000' },
        { label: 'Transmark', value:'150500' },
        { label: 'Triumph', value:'101700' },
        { label: 'Tsm', value:'968700' },
        { label: 'TVS', value:'101900' },
        { label: 'UD', value:'106000' },
        { label: 'UM', value:'112600' },
        { label: 'UNDEFINED', value:'209200' },
        { label: 'Vespa', value:'106900' },
        { label: 'Victory', value:'102100' },
        { label: 'Volkswagon', value:'120400' },
        { label: 'Voltas', value:'104100' },
        { label: 'Volvo', value:'140100' },
        { label: 'Wangye', value:'209900' },
        { label: 'War Eagle', value:'105000' },
        { label: 'Western Star', value:'102500' },
        { label: 'X Tream', value:'983000' },
        { label: 'XCMG', value:'988000' },
        { label: 'XGMA', value:'208000' },
        { label: 'XIAGONG', value:'985000' },
        { label: 'Xiamen', value:'120800' },
        { label: 'Yale', value:'969200' },
        { label: 'Yamaha', value:'980200' },
        { label: 'Yanmar', value:'151000' },
        { label: 'Yara', value:'130800' },
        { label: 'Ziegler', value:'969300' },
        { label: 'Znen', value:'107800' },
        { label: 'Zoomlion', value:'107600' },
        { label: 'Zotye', value:'107900' },
        { label: 'ZTOMYF', value:'106700' },
        { label: 'ZX Auto', value:'101600' },
        { label: 'ZX AUTO', value:'1001034' }
      ]
    },
    getTravelTypes() {
      return [
        { label: 'Business', value: '1' },
        { label: 'Study', value: '2' },
        { label: 'Tourism', value: '3' }
      ]
    },
    getPolicyTypes() {
      return [
        { label: 'Single Trip', value:'1' },
        { label: 'Multiple Trip', value:'2' }
      ]
    },
    getRiskTypes() {
      return [
        {label:'residential', value: '1' },
        {label:'restaurant', value: '2' },
        {label:'commercial', value: '3' }
      ]
    },
    getCountries() {
      return [
        { label:'Afghanistan', value:'AF' },
        { label:'Albania', value:'AL' },
        { label:'Algeria', value:'DZ' },
        { label:'American Samoa', value:'DS' },
        { label:'Andorra', value:'AD' },
        { label:'Angola', value:'AO' },
        { label:'Anguilla', value:'AI' },
        { label:'Antarctica', value:'AQ' },
        { label:'Antigua and Barbuda', value:'AG' },
        { label:'Argentina', value:'AR' },
        { label:'Armenia', value:'AM' },
        { label:'Aruba', value:'AW' },
        { label:'Australia', value:'AU' },
        { label:'Austria', value:'AT' },
        { label:'Azerbaijan', value:'AZ' },
        { label:'Bahamas', value:'BS' },
        { label:'Bahrain', value:'BH' },
        { label:'Bangladesh', value:'BD' },
        { label:'Barbados', value:'BB' },
        { label:'Belarus', value:'BY' },
        { label:'Belgium', value:'BE' },
        { label:'Belize', value:'BZ' },
        { label:'Benin', value:'BJ' },
        { label:'Bermuda', value:'BM' },
        { label:'Bhutan', value:'BT' },
        { label:'Bolivia', value:'BO' },
        { label:'Bosnia and Herzegovina', value:'BA' },
        { label:'Botswana', value:'BW' },
        { label:'Bouvet Island', value:'BV' },
        { label:'Brazil', value:'BR' },
        { label:'British Indian Ocean Territory', value:'IO' },
        { label:'Brunei Darussalam', value:'BN' },
        { label:'Bulgaria', value:'BG' },
        { label:'Burkina Faso', value:'BF' },
        { label:'Burundi', value:'BI' },
        { label:'Cambodia', value:'KH' },
        { label:'Cameroon', value:'CM' },
        { label:'Canada', value:'CA' },
        { label:'Cape Verde', value:'CV' },
        { label:'Cayman Islands', value:'KY' },
        { label:'Central African Republic', value:'CF' },
        { label:'Chad', value:'TD' },
        { label:'Chile', value:'CL' },
        { label:'China', value:'CN' },
        { label:'Christmas Island', value:'CX' },
        { label:'Cocos (Keeling) Islands', value:'CC' },
        { label:'Colombia', value:'CO' },
        { label:'Comoros', value:'KM' },
        { label:'Congo', value:'CG' },
        { label:'Cook Islands', value:'CK' },
        { label:'Costa Rica', value:'CR' },
        { label:'Croatia (Hrvatska)', value:'HR' },
        { label:'Cuba', value:'CU' },
        { label:'Cyprus', value:'CY' },
        { label:'Czech Republic', value:'CZ' },
        { label:'Denmark', value:'DK' },
        { label:'Djibouti', value:'DJ' },
        { label:'Dominica', value:'DM' },
        { label:'Dominican Republic', value:'DO' },
        { label:'East Timor', value:'TP' },
        { label:'Ecuador', value:'EC' },
        { label:'Egypt', value:'EG' },
        { label:'El Salvador', value:'SV' },
        { label:'Equatorial Guinea', value:'GQ' },
        { label:'Eritrea', value:'ER' },
        { label:'Estonia', value:'EE' },
        { label:'Ethiopia', value:'ET' },
        { label:'Falkland Islands (Malvinas)', value:'FK' },
        { label:'Faroe Islands', value:'FO' },
        { label:'Fiji', value:'FJ' },
        { label:'Finland', value:'FI' },
        { label:'France', value:'FR' },
        { label:'France, Metropolitan', value:'FX' },
        { label:'French Guiana', value:'GF' },
        { label:'French Polynesia', value:'PF' },
        { label:'French Southern Territories', value:'TF' },
        { label:'Gabon', value:'GA' },
        { label:'Gambia', value:'GM' },
        { label:'Georgia', value:'GE' },
        { label:'Germany', value:'DE' },
        { label:'Ghana', value:'GH' },
        { label:'Gibraltar', value:'GI' },
        { label:'Guernsey', value:'GK' },
        { label:'Greece', value:'GR' },
        { label:'Greenland', value:'GL' },
        { label:'Grenada', value:'GD' },
        { label:'Guadeloupe', value:'GP' },
        { label:'Guam', value:'GU' },
        { label:'Guatemala', value:'GT' },
        { label:'Guinea', value:'GN' },
        { label:'Guinea-Bissau', value:'GW' },
        { label:'Guyana', value:'GY' },
        { label:'Haiti', value:'HT' },
        { label:'Heard and Mc Donald Islands', value:'HM' },
        { label:'Honduras', value:'HN' },
        { label:'Hong Kong', value:'HK' },
        { label:'Hungary', value:'HU' },
        { label:'Iceland', value:'IS' },
        { label:'India', value:'IN' },
        { label:'Isle of Man', value:'IM' },
        { label:'Indonesia', value:'ID' },
        { label:'Iran (Islamic Republic of)', value:'IR' },
        { label:'Iraq', value:'IQ' },
        { label:'Ireland', value:'IE' },
        { label:'Israel', value:'IL' },
        { label:'Italy', value:'IT' },
        { label:'Ivory Coast', value:'CI' },
        { label:'Jersey', value:'JE' },
        { label:'Jamaica', value:'JM' },
        { label:'Japan', value:'JP' },
        { label:'Jordan', value:'JO' },
        { label:'Kazakhstan', value:'KZ' },
        { label:'Kenya', value:'KE' },
        { label:'Kiribati', value:'KI' },
        { label:'Korea, Democratic People\'s Republic of', value:'KP' },
        { label:'Korea, Republic of', value:'KR' },
        { label:'Kosovo', value:'XK' },
        { label:'Kuwait', value:'KW' },
        { label:'Kyrgyzstan', value:'KG' },
        { label:'Lao People\'s Democratic Republic', value:'LA' },
        { label:'Latvia', value:'LV' },
        { label:'Lebanon', value:'LB' },
        { label:'Lesotho', value:'LS' },
        { label:'Liberia', value:'LR' },
        { label:'Libyan Arab Jamahiriya', value:'LY' },
        { label:'Liechtenstein', value:'LI' },
        { label:'Lithuania', value:'LT' },
        { label:'Luxembourg', value:'LU' },
        { label:'Macau', value:'MO' },
        { label:'Macedonia', value:'MK' },
        { label:'Madagascar', value:'MG' },
        { label:'Malawi', value:'MW' },
        { label:'Malaysia', value:'MY' },
        { label:'Maldives', value:'MV' },
        { label:'Mali', value:'ML' },
        { label:'Malta', value:'MT' },
        { label:'Marshall Islands', value:'MH' },
        { label:'Martinique', value:'MQ' },
        { label:'Mauritania', value:'MR' },
        { label:'Mauritius', value:'MU' },
        { label:'Mayotte', value:'TY' },
        { label:'Mexico', value:'MX' },
        { label:'Micronesia, Federated States of', value:'FM' },
        { label:'Moldova, Republic of', value:'MD' },
        { label:'Monaco', value:'MC' },
        { label:'Mongolia', value:'MN' },
        { label:'Montenegro', value:'ME' },
        { label:'Montserrat', value:'MS' },
        { label:'Morocco', value:'MA' },
        { label:'Mozambique', value:'MZ' },
        { label:'Myanmar', value:'MM' },
        { label:'Namibia', value:'NA' },
        { label:'Nauru', value:'NR' },
        { label:'Nepal', value:'NP' },
        { label:'Netherlands', value:'NL' },
        { label:'Netherlands Antilles', value:'AN' },
        { label:'New Caledonia', value:'NC' },
        { label:'New Zealand', value:'NZ' },
        { label:'Nicaragua', value:'NI' },
        { label:'Niger', value:'NE' },
        { label:'Nigeria', value:'NG' },
        { label:'Niue', value:'NU' },
        { label:'Norfolk Island', value:'NF' },
        { label:'Northern Mariana Islands', value:'MP' },
        { label:'Norway', value:'NO' },
        { label:'Oman', value:'OM' },
        { label:'Pakistan', value:'PK' },
        { label:'Palau', value:'PW' },
        { label:'Palestine', value:'PS' },
        { label:'Panama', value:'PA' },
        { label:'Papua New Guinea', value:'PG' },
        { label:'Paraguay', value:'PY' },
        { label:'Peru', value:'PE' },
        { label:'Philippines', value:'PH' },
        { label:'Pitcairn', value:'PN' },
        { label:'Poland', value:'PL' },
        { label:'Portugal', value:'PT' },
        { label:'Puerto Rico', value:'PR' },
        { label:'Qatar', value:'QA' },
        { label:'Reunion', value:'RE' },
        { label:'Romania', value:'RO' },
        { label:'Russian Federation', value:'RU' },
        { label:'Rwanda', value:'RW' },
        { label:'Saint Kitts and Nevis', value:'KN' },
        { label:'Saint Lucia', value:'LC' },
        { label:'Saint Vincent and the Grenadines', value:'VC' },
        { label:'Samoa', value:'WS' },
        { label:'San Marino', value:'SM' },
        { label:'Sao Tome and Principe', value:'ST' },
        { label:'Saudi Arabia', value:'SA' },
        { label:'Senegal', value:'SN' },
        { label:'Serbia', value:'RS' },
        { label:'Seychelles', value:'SC' },
        { label:'Sierra Leone', value:'SL' },
        { label:'Singapore', value:'SG' },
        { label:'Slovakia', value:'SK' },
        { label:'Slovenia', value:'SI' },
        { label:'Solomon Islands', value:'SB' },
        { label:'Somalia', value:'SO' },
        { label:'South Africa', value:'ZA' },
        { label:'South Georgia South Sandwich Islands', value:'GS' },
        { label:'Spain', value:'ES' },
        { label:'Sri Lanka', value:'LK' },
        { label:'St. Helena', value:'SH' },
        { label:'St. Pierre and Miquelon', value:'PM' },
        { label:'Sudan', value:'SD' },
        { label:'Suriname', value:'SR' },
        { label:'Svalbard and Jan Mayen Islands', value:'SJ' },
        { label:'Swaziland', value:'SZ' },
        { label:'Sweden', value:'SE' },
        { label:'Switzerland', value:'CH' },
        { label:'Syrian Arab Republic', value:'SY' },
        { label:'Taiwan', value:'TW' },
        { label:'Tajikistan', value:'TJ' },
        { label:'Tanzania, United Republic of', value:'TZ' },
        { label:'Thailand', value:'TH' },
        { label:'Togo', value:'TG' },
        { label:'Tokelau', value:'TK' },
        { label:'Tonga', value:'TO' },
        { label:'Trinidad and Tobago', value:'TT' },
        { label:'Tunisia', value:'TN' },
        { label:'Turkey', value:'TR' },
        { label:'Turkmenistan', value:'TM' },
        { label:'Turks and Caicos Islands', value:'TC' },
        { label:'Tuvalu', value:'TV' },
        { label:'Uganda', value:'UG' },
        { label:'Ukraine', value:'UA' },
        { label:'United Arab Emirates', value:'AE' },
        { label:'United Kingdom', value:'GB' },
        { label:'United States', value:'US' },
        { label:'United States minor outlying islands', value:'UM' },
        { label:'Uruguay', value:'UY' },
        { label:'Uzbekistan', value:'UZ' },
        { label:'Vanuatu', value:'VU' },
        { label:'Vatican City State', value:'VA' },
        { label:'Venezuela', value:'VE' },
        { label:'Vietnam', value:'VN' },
        { label:'Virgin Islands (British)', value:'VG' },
        { label:'Virgin Islands (U.S.)', value:'VI' },
        { label:'Wallis and Futuna Islands', value:'WF' },
        { label:'Western Sahara', value:'EH' },
        { label:'Yemen', value:'YE' },
        { label:'Yugoslavia', value:'YU' },
        { label:'Zaire', value:'ZR' },
        { label:'Zambia', value:'ZM' },
      ]
    }
  }
}
</script>
