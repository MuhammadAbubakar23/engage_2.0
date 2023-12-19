import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import * as echarts from 'echarts';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from 'ng2-charts';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TagCloudComponent, NgxSpinnerModule, GoogleMapsModule],
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit {
  
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24.8607,
    lng: 67.0011
  };
  zoom = 11;
  karachiBoundary: any
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  paths: { [key: string]: google.maps.LatLngLiteral[] } = {
    DefencePath: [
      { lat: 24.80175, lng: 67.031975 },
      { lat: 24.77802, lng: 67.055279 },
      { lat: 24.775661, lng: 67.05234 },
      { lat: 24.746189, lng: 67.073788 },
      { lat: 24.761149, lng: 67.106656 },
      { lat: 24.800733, lng: 67.076741 },
      { lat: 24.833841, lng: 67.0738 },
      { lat: 24.835418, lng: 67.070892 },
      { lat: 24.838753, lng: 67.073292 },
      { lat: 24.842983, lng: 67.070586 },
      { lat: 24.843805, lng: 67.067793 },
      { lat: 24.848734, lng: 67.066526 },
      { lat: 24.848784, lng: 67.062159 },
      { lat: 24.846492, lng: 67.060447 },
      { lat: 24.84483, lng: 67.055718 },
      { lat: 24.841506, lng: 67.05816 },
      { lat: 24.839922, lng: 67.053802 },
      { lat: 24.837105, lng: 67.052267 },
      { lat: 24.832659, lng: 67.048452 },
      { lat: 24.821594, lng: 67.044099 },
      { lat: 24.818652, lng: 67.043531 },
      { lat: 24.81644, lng: 67.042604 },
      { lat: 24.819093, lng: 67.037699 },
      { lat: 24.813486, lng: 67.036297 },
      { lat: 24.812222, lng: 67.037442 },
      { lat: 24.80188, lng: 67.031763 }
    ],
    CliftonPath: [
      { lat: 24.800677, lng: 67.029975 },
      { lat: 24.803988, lng: 67.027679 },
      { lat: 24.806325, lng: 67.024482 },
      { lat: 24.809987, lng: 67.016671 },
      { lat: 24.812461, lng: 67.005685 },
      { lat: 24.813843, lng: 66.993926 },
      { lat: 24.818966, lng: 66.995192 },
      { lat: 24.816054, lng: 67.011618 },
      { lat: 24.817383, lng: 67.01584 },
      { lat: 24.815458, lng: 67.020418 },
      { lat: 24.826492, lng: 67.025562 },
      { lat: 24.826972, lng: 67.022502 },
      { lat: 24.827997, lng: 67.020129 },
      { lat: 24.83169, lng: 67.021447 },
      { lat: 24.833022, lng: 67.024266 },
      { lat: 24.833591, lng: 67.028894 },
      { lat: 24.834187, lng: 67.03138 },
      { lat: 24.835328, lng: 67.033136 },
      { lat: 24.841061, lng: 67.032306 },
      { lat: 24.833568, lng: 67.038769 },
      { lat: 24.826023, lng: 67.043266 },
      { lat: 24.824588, lng: 67.035312 },
      { lat: 24.813529, lng: 67.027537 },
      { lat: 24.810686, lng: 67.031236 },
      { lat: 24.808778, lng: 67.035279 },
      { lat: 24.800754, lng: 67.030233 }
    ],
    KorangiPath: [
      { lat: 24.790533, lng: 67.104001 },
      { lat: 24.798442, lng: 67.10988 },
      { lat: 24.793903, lng: 67.117519 },
      { lat: 24.807022, lng: 67.12623 },
      { lat: 24.802829, lng: 67.132775 },
      { lat: 24.799291, lng: 67.134524 },
      { lat: 24.802431, lng: 67.145333 },
      { lat: 24.792313, lng: 67.148334 },
      { lat: 24.801046, lng: 67.153654 },
      { lat: 24.805802, lng: 67.169404 },
      { lat: 24.828785, lng: 67.164275 },
      { lat: 24.827228, lng: 67.158084 },
      { lat: 24.834161, lng: 67.156298 },
      { lat: 24.836907, lng: 67.16976 },
      { lat: 24.844413, lng: 67.168122 },
      { lat: 24.84287, lng: 67.160995 },
      { lat: 24.846713, lng: 67.160092 },
      { lat: 24.842755, lng: 67.141874 },
      { lat: 24.862212, lng: 67.137571 },
      { lat: 24.858312, lng: 67.124069 },
      { lat: 24.856946, lng: 67.110537 },
      { lat: 24.847638, lng: 67.097355 },
      { lat: 24.836362, lng: 67.091193 },
      { lat: 24.828972, lng: 67.093133 },
      { lat: 24.825361, lng: 67.098243 },
      { lat: 24.819492, lng: 67.100691 },
      { lat: 24.807039, lng: 67.102689 },
      { lat: 24.805954, lng: 67.09871 },
      { lat: 24.80099, lng: 67.096184 },
      { lat: 24.79065, lng: 67.104043 }
    ],
    LandhiPath: [
      { lat: 24.806826, lng: 67.177715 },
      { lat: 24.806592, lng: 67.189088 },
      { lat: 24.799541, lng: 67.201469 },
      { lat: 24.811676, lng: 67.210664 },
      { lat: 24.81416, lng: 67.225561 },
      { lat: 24.813999, lng: 67.240434 },
      { lat: 24.837016, lng: 67.240918 },
      { lat: 24.837297, lng: 67.225418 },
      { lat: 24.844059, lng: 67.226508 },
      { lat: 24.85082, lng: 67.211978 },
      { lat: 24.8622, lng: 67.202228 },
      { lat: 24.8587, lng: 67.18199 },
      { lat: 24.860239, lng: 67.173411 },
      { lat: 24.865516, lng: 67.167236 },
      { lat: 24.866121, lng: 67.155181 },
      { lat: 24.855793, lng: 67.157479 },
      { lat: 24.843035, lng: 67.161246 },
      { lat: 24.84425, lng: 67.168065 },
      { lat: 24.836951, lng: 67.169672 },
      { lat: 24.833808, lng: 67.156227 },
      { lat: 24.82729, lng: 67.158045 },
      { lat: 24.828978, lng: 67.164404 },
      { lat: 24.823005, lng: 67.165352 },
      { lat: 24.826524, lng: 67.181963 },
      { lat: 24.823881, lng: 67.184817 },
      { lat: 24.822755, lng: 67.184142 },
      { lat: 24.822698, lng: 67.182688 },
      { lat: 24.817172, lng: 67.182132 },
      { lat: 24.813204, lng: 67.180545 },
      { lat: 24.806982, lng: 67.177888 },
    ],
    NorthNazimabadPath: [
      { lat: 24.964112, lng: 67.04433 },
      { lat: 24.956131, lng: 67.040891 },
      { lat: 24.945348, lng: 67.032131 },
      { lat: 24.937989, lng: 67.024487 },
      { lat: 24.932324, lng: 67.015987 },
      { lat: 24.930091, lng: 67.020149 },
      { lat: 24.929025, lng: 67.024568 },
      { lat: 24.925526, lng: 67.031541 },
      { lat: 24.921617, lng: 67.031552 },
      { lat: 24.918923, lng: 67.040998 },
      { lat: 24.923971, lng: 67.046858 },
      { lat: 24.927584, lng: 67.052105 },
      { lat: 24.931976, lng: 67.054777 },
      { lat: 24.936211, lng: 67.057063 },
      { lat: 24.93615, lng: 67.058978 },
      { lat: 24.938891, lng: 67.06158 },
      { lat: 24.941864, lng: 67.062745 },
      { lat: 24.94413, lng: 67.06779 },
      { lat: 24.946706, lng: 67.066999 },
      { lat: 24.964404, lng: 67.044523 }
    ],
    NorthKarachiPath: [
      { lat: 24.960505, lng: 67.04905 },
      { lat: 24.964418, lng: 67.046829 },
      { lat: 24.980702, lng: 67.046153 },
      { lat: 24.983253, lng: 67.048909 },
      { lat: 24.985181, lng: 67.052181 },
      { lat: 25.005807, lng: 67.05085 },
      { lat: 25.006841, lng: 67.06458 },
      { lat: 24.985727, lng: 67.065776 },
      { lat: 24.986986, lng: 67.091084 },
      { lat: 24.976743, lng: 67.091319 },
      { lat: 24.966214, lng: 67.090587 },
      { lat: 24.964765, lng: 67.066806 },
      { lat: 24.954085, lng: 67.057698 },
      { lat: 24.960543, lng: 67.04905 },
    ],
    NazimabadPath: [
      { lat: 24.93137, lng: 67.015789 },
      { lat: 24.928354, lng: 67.020059 },
      { lat: 24.922735, lng: 67.018123 },
      { lat: 24.915092, lng: 67.018246 },
      { lat: 24.908928, lng: 67.018627 },
      { lat: 24.902919, lng: 67.021583 },
      { lat: 24.901858, lng: 67.030026 },
      { lat: 24.901109, lng: 67.036238 },
      { lat: 24.902384, lng: 67.038416 },
      { lat: 24.90995, lng: 67.039805 },
      { lat: 24.909334, lng: 67.049512 },
      { lat: 24.916033, lng: 67.051619 },
      { lat: 24.919304, lng: 67.046493 },
      { lat: 24.923119, lng: 67.031613 },
      { lat: 24.925308, lng: 67.032338 },
      { lat: 24.927497, lng: 67.028773 },
      { lat: 24.928918, lng: 67.024216 },
      { lat: 24.932596, lng: 67.015668 },
      { lat: 24.931292, lng: 67.015531 },
    ],
    LiaquatababPath: [
      { lat: 24.883341, lng: 67.021919 },
      { lat: 24.887205, lng: 67.025894 },
      { lat: 24.888903, lng: 67.028096 },
      { lat: 24.889589, lng: 67.031157 },
      { lat: 24.890937, lng: 67.035033 },
      { lat: 24.89283, lng: 67.038737 },
      { lat: 24.892723, lng: 67.04357 },
      { lat: 24.895399, lng: 67.049755 },
      { lat: 24.897453, lng: 67.055941 },
      { lat: 24.898538, lng: 67.059183 },
      { lat: 24.900635, lng: 67.061997 },
      { lat: 24.906897, lng: 67.064982 },
      { lat: 24.915808, lng: 67.05139 },
      { lat: 24.909326, lng: 67.049701 },
      { lat: 24.909939, lng: 67.040467 },
      { lat: 24.907717, lng: 67.038673 },
      { lat: 24.902927, lng: 67.03851 },
      { lat: 24.901056, lng: 67.036373 },
      { lat: 24.903273, lng: 67.017538 },
      { lat: 24.89504, lng: 67.020265 },
      { lat: 24.88921, lng: 67.020513 },
      { lat: 24.886061, lng: 67.020637 },
      { lat: 24.88338, lng: 67.021963 },
    ], 
    BinQasimPath: [
      { lat: 24.812808, lng: 67.287867 },
      { lat: 24.808601, lng: 67.308466 },
      { lat: 24.793876, lng: 67.324087 },
      { lat: 24.77718, lng: 67.306105 },
      { lat: 24.763376, lng: 67.320804 },
      { lat: 24.762977, lng: 67.327263 },
      { lat: 24.774501, lng: 67.343334 },
      { lat: 24.774964, lng: 67.354804 },
      { lat: 24.778232, lng: 67.365929 },
      { lat: 24.779002, lng: 67.384576 },
      { lat: 24.78453, lng: 67.385316 },
      { lat: 24.768513, lng: 67.423109 },
      { lat: 24.779831, lng: 67.447412 },
      { lat: 24.845243, lng: 67.440831 },
      { lat: 24.848663, lng: 67.428286 },
      { lat: 24.868748, lng: 67.37643 },
      { lat: 24.859006, lng: 67.342426 },
      { lat: 24.863376, lng: 67.315592 },
      { lat: 24.866967, lng: 67.304292 },
      { lat: 24.86605, lng: 67.299718 },
      { lat: 24.855604, lng: 67.305113 },
      { lat: 24.844067, lng: 67.307075 },
      { lat: 24.844017, lng: 67.295475 },
      { lat: 24.840721, lng: 67.29534 },
      { lat: 24.839696, lng: 67.283557 },
      { lat: 24.813276, lng: 67.287738 }
    ],
     BaldiaPath: [
      { "lat": 24.899967, "lng": 66.969746 },
      { "lat": 24.915935, "lng": 66.949833 },
      { "lat": 24.936572, "lng": 66.937474 },
      { "lat": 24.973778, "lng": 66.912669 },
      { "lat": 24.977595, "lng": 66.916231 },
      { "lat": 24.979582, "lng": 66.926852 },
      { "lat": 24.996445, "lng": 66.944866 },
      { "lat": 25.000715, "lng": 66.950869 },
      { "lat": 24.977994, "lng": 66.963633 },
      { "lat": 24.972117, "lng": 66.952699 },
      { "lat": 24.965463, "lng": 66.956845 },
      { "lat": 24.965599, "lng": 66.959562 },
      { "lat": 24.957574, "lng": 66.961607 },
      { "lat": 24.951625, "lng": 66.966042 },
      { "lat": 24.945986, "lng": 66.969189 },
      { "lat": 24.94397, "lng": 66.971706 },
      { "lat": 24.940491, "lng": 66.973695 },
      { "lat": 24.938957, "lng": 66.973194 },
      { "lat": 24.938669, "lng": 66.975311 },
      { "lat": 24.933252, "lng": 66.977593 },
      { "lat": 24.932489, "lng": 66.979205 },
      { "lat": 24.931368, "lng": 66.976793 },
      { "lat": 24.928006, "lng": 66.979278 },
      { "lat": 24.924632, "lng": 66.985498 },
      { "lat": 24.920045, "lng": 66.992728 },
      { "lat": 24.918083, "lng": 66.992631 },
      { "lat": 24.916206, "lng": 66.989901 },
      { "lat": 24.916358, "lng": 66.989329 },
      { "lat": 24.914877, "lng": 66.986619 },
      { "lat": 24.916004, "lng": 66.982367 },
      { "lat": 24.912326, "lng": 66.979254 },
      { "lat": 24.910272, "lng": 66.981259 },
      { "lat": 24.908195, "lng": 66.978378 },
      { "lat": 24.909141, "lng": 66.977281 },
      { "lat": 24.903269, "lng": 66.972569 },
      { "lat": 24.899655, "lng": 66.969746 }
    ],
    BahdurabadPath: [
      { "lat": 24.879707, "lng": 67.065252 },
      { "lat": 24.881331, "lng": 67.066481 },
      { "lat": 24.882021, "lng": 67.065434 },
      { "lat": 24.883927, "lng": 67.06684 },
      { "lat": 24.883261, "lng": 67.067977 },
      { "lat": 24.88586, "lng": 67.069929 },
      { "lat": 24.884928, "lng": 67.071688 },
      { "lat": 24.883881, "lng": 67.073189 },
      { "lat": 24.882955, "lng": 67.072843 },
      { "lat": 24.881941, "lng": 67.072044 },
      { "lat": 24.877459, "lng": 67.068815 },
      { "lat": 24.879707, "lng": 67.065274 }
    ],
    FBAreaPath: [
      { "lat": 24.906691, "lng": 67.063822 },
      { "lat": 24.910661, "lng": 67.066646 },
      { "lat": 24.914514, "lng": 67.078014 },
      { "lat": 24.924925, "lng": 67.080265 },
      { "lat": 24.930208, "lng": 67.088515 },
      { "lat": 24.934019, "lng": 67.090191 },
      { "lat": 24.939231, "lng": 67.089807 },
      { "lat": 24.944986, "lng": 67.08595 },
      { "lat": 24.950977, "lng": 67.083101 },
      { "lat": 24.95619, "lng": 67.084614 },
      { "lat": 24.961245, "lng": 67.083776 },
      { "lat": 24.962174, "lng": 67.078669 },
      { "lat": 24.957146, "lng": 67.076135 },
      { "lat": 24.954792, "lng": 67.07463 },
      { "lat": 24.951835, "lng": 67.075181 },
      { "lat": 24.949033, "lng": 67.071305 },
      { "lat": 24.946349, "lng": 67.068575 },
      { "lat": 24.943782, "lng": 67.067063 },
      { "lat": 24.942538, "lng": 67.06434 },
      { "lat": 24.941841, "lng": 67.062154 },
      { "lat": 24.939203, "lng": 67.061903 },
      { "lat": 24.938594, "lng": 67.060198 },
      { "lat": 24.936288, "lng": 67.059193 },
      { "lat": 24.936189, "lng": 67.056152 },
      { "lat": 24.93249, "lng": 67.054791 },
      { "lat": 24.930228, "lng": 67.053013 },
      { "lat": 24.928895, "lng": 67.05143 },
      { "lat": 24.926657, "lng": 67.050927 },
      { "lat": 24.923038, "lng": 67.046744 },
      { "lat": 24.921131, "lng": 67.043356 },
      { "lat": 24.915799, "lng": 67.039711 },
      { "lat": 24.909844, "lng": 67.040358 },
      { "lat": 24.909065, "lng": 67.052213 },
      { "lat": 24.908015, "lng": 67.062009 },
      { "lat": 24.906964, "lng": 67.063994 }
    ],
    GardenPath: [
      { "lat": 24.887307, "lng": 67.032993 },
      { "lat": 24.883064, "lng": 67.036619 },
      { "lat": 24.881419, "lng": 67.033631 },
      { "lat": 24.878957, "lng": 67.030257 },
      { "lat": 24.87774, "lng": 67.028814 },
      { "lat": 24.875496, "lng": 67.027792 },
      { "lat": 24.873761, "lng": 67.022367 },
      { "lat": 24.875541, "lng": 67.020867 },
      { "lat": 24.869783, "lng": 67.015182 },
      { "lat": 24.870739, "lng": 67.012532 },
      { "lat": 24.879355, "lng": 67.017387 },
      { "lat": 24.876635, "lng": 67.021231 },
      { "lat": 24.879722, "lng": 67.023372 },
      { "lat": 24.882263, "lng": 67.0262 },
      { "lat": 24.887346, "lng": 67.032885 }
    ],
    GulshanPath: [
      { "lat": 24.991862, "lng": 67.136163 },
      { "lat": 24.962569, "lng": 67.169229 },
      { "lat": 24.95543, "lng": 67.166879 },
      { "lat": 24.9404, "lng": 67.160426 },
      { "lat": 24.939617, "lng": 67.162928 },
      { "lat": 24.924671, "lng": 67.154395 },
      { "lat": 24.924807, "lng": 67.151682 },
      { "lat": 24.922453, "lng": 67.150686 },
      { "lat": 24.919456, "lng": 67.14835 },
      { "lat": 24.914279, "lng": 67.144641 },
      { "lat": 24.913306, "lng": 67.142992 },
      { "lat": 24.906299, "lng": 67.140687 },
      { "lat": 24.902523, "lng": 67.137652 },
      { "lat": 24.907408, "lng": 67.135834 },
      { "lat": 24.906269, "lng": 67.13896 },
      { "lat": 24.919595, "lng": 67.144063 },
      { "lat": 24.923727, "lng": 67.137795 },
      { "lat": 24.917757, "lng": 67.131807 },
      { "lat": 24.919423, "lng": 67.129758 },
      { "lat": 24.91611, "lng": 67.126137 },
      { "lat": 24.914824, "lng": 67.127373 },
      { "lat": 24.914551, "lng": 67.126532 },
      { "lat": 24.915562, "lng": 67.12579 },
      { "lat": 24.916671, "lng": 67.121599 },
      { "lat": 24.914092, "lng": 67.117873 },
      { "lat": 24.915566, "lng": 67.116525 },
      { "lat": 24.914085, "lng": 67.112289 },
      { "lat": 24.908985, "lng": 67.115063 },
      { "lat": 24.904596, "lng": 67.110156 },
      { "lat": 24.901141, "lng": 67.111258 },
      { "lat": 24.896752, "lng": 67.099227 },
      { "lat": 24.897396, "lng": 67.097067 },
      { "lat": 24.900221, "lng": 67.095937 },
      { "lat": 24.903171, "lng": 67.09535 },
      { "lat": 24.900359, "lng": 67.092618 },
      { "lat": 24.897976, "lng": 67.092267 },
      { "lat": 24.898108, "lng": 67.082243 },
      { "lat": 24.892958, "lng": 67.084312 },
      { "lat": 24.892193, "lng": 67.081548 },
      { "lat": 24.896151, "lng": 67.079415 },
      { "lat": 24.905993, "lng": 67.064766 },
      { "lat": 24.910252, "lng": 67.06905 },
      { "lat": 24.913856, "lng": 67.078813 },
      { "lat": 24.925399, "lng": 67.081366 },
      { "lat": 24.929336, "lng": 67.089047 },
      { "lat": 24.93581, "lng": 67.091363 },
      { "lat": 24.946603, "lng": 67.088142 },
      { "lat": 24.962776, "lng": 67.108118 },
      { "lat": 24.991707, "lng": 67.136162 }
    ],
    MalirPath: [
      { "lat": 24.866028, "lng": 67.204135 },
      { "lat": 24.875739, "lng": 67.193221 },
      { "lat": 24.884253, "lng": 67.17506 },
      { "lat": 24.913189, "lng": 67.18452 },
      { "lat": 24.913982, "lng": 67.188747 },
      { "lat": 24.929096, "lng": 67.178899 },
      { "lat": 24.947802, "lng": 67.181518 },
      { "lat": 24.986451, "lng": 67.194652 },
      { "lat": 24.982433, "lng": 67.227312 },
      { "lat": 24.975614, "lng": 67.263405 },
      { "lat": 24.964346, "lng": 67.260766 },
      { "lat": 24.955878, "lng": 67.249201 },
      { "lat": 24.942149, "lng": 67.243418 },
      { "lat": 24.934023, "lng": 67.232486 },
      { "lat": 24.910919, "lng": 67.227101 },
      { "lat": 24.90609, "lng": 67.224537 },
      { "lat": 24.900638, "lng": 67.226436 },
      { "lat": 24.894404, "lng": 67.224398 },
      { "lat": 24.884115, "lng": 67.216546 },
      { "lat": 24.882379, "lng": 67.211827 },
      { "lat": 24.865982, "lng": 67.20445 }
    ],
    ShahFaisalPath: [
      { "lat": 24.867286, "lng": 67.112066 },
      { "lat": 24.868665, "lng": 67.123523 },
      { "lat": 24.870824, "lng": 67.135324 },
      { "lat": 24.872282, "lng": 67.146866 },
      { "lat": 24.872026, "lng": 67.157894 },
      { "lat": 24.870213, "lng": 67.172312 },
      { "lat": 24.86513, "lng": 67.184327 },
      { "lat": 24.866332, "lng": 67.203722 },
      { "lat": 24.875891, "lng": 67.192466 },
      { "lat": 24.884184, "lng": 67.177937 },
      { "lat": 24.887182, "lng": 67.162121 },
      { "lat": 24.887222, "lng": 67.145103 },
      { "lat": 24.894854, "lng": 67.142777 },
      { "lat": 24.895248, "lng": 67.136837 },
      { "lat": 24.88716, "lng": 67.136031 },
      { "lat": 24.886789, "lng": 67.125233 },
      { "lat": 24.883399, "lng": 67.127843 },
      { "lat": 24.885419, "lng": 67.130917 },
      { "lat": 24.883696, "lng": 67.133545 },
      { "lat": 24.876202, "lng": 67.131335 },
      { "lat": 24.867908, "lng": 67.111895 }
    ],
    SurjaniPath: [
      { "lat": 25.005476, "lng": 67.047919 },
      { "lat": 25.037986, "lng": 67.040194 },
      { "lat": 25.081061, "lng": 67.040022 },
      { "lat": 25.083237, "lng": 67.076071 },
      { "lat": 25.051983, "lng": 67.081564 },
      { "lat": 25.007654, "lng": 67.084311 },
      { "lat": 25.004854, "lng": 67.048777 }
    ],
    TipuSultanPath: [
      { "lat": 24.887902, "lng": 67.086959 },
      { "lat": 24.875039, "lng": 67.096287 },
      { "lat": 24.865135, "lng": 67.077463 },
      { "lat": 24.859964, "lng": 67.059385 },
      { "lat": 24.870572, "lng": 67.047519 },
      { "lat": 24.876602, "lng": 67.051425 },
      { "lat": 24.874023, "lng": 67.056403 },
      { "lat": 24.881634, "lng": 67.061982 },
      { "lat": 24.876923, "lng": 67.06902 },
      { "lat": 24.882919, "lng": 67.074041 },
      { "lat": 24.887279, "lng": 67.077453 },
      { "lat": 24.888214, "lng": 67.086959 }
    ],
    SaddarPath: [
      { "lat": 24.833983, "lng": 67.024011 },
      { "lat": 24.828668, "lng": 67.020005 },
      { "lat": 24.828689, "lng": 67.01999 },
      { "lat": 24.82877, "lng": 67.019917 },
      { "lat": 24.828816, "lng": 67.019901 },
      { "lat": 24.82879, "lng": 67.019954 },
      { "lat": 24.828816, "lng": 67.019974 },
      { "lat": 24.828635, "lng": 67.020056 },
      { "lat": 24.828701, "lng": 67.019878 },
      { "lat": 24.837868, "lng": 67.011067 },
      { "lat": 24.842961, "lng": 67.007135 },
      { "lat": 24.845707, "lng": 66.995966 },
      { "lat": 24.84563, "lng": 66.992136 },
      { "lat": 24.849525, "lng": 66.98925 },
      { "lat": 24.849373, "lng": 66.991482 },
      { "lat": 24.852262, "lng": 66.993156 },
      { "lat": 24.854108, "lng": 66.99629 },
      { "lat": 24.857277, "lng": 66.999681 },
      { "lat": 24.86177, "lng": 67.00024 },
      { "lat": 24.866891, "lng": 66.999385 },
      { "lat": 24.86779, "lng": 67.000208 },
      { "lat": 24.865615, "lng": 67.000823 },
      { "lat": 24.865509, "lng": 67.00257 },
      { "lat": 24.871801, "lng": 67.008423 },
      { "lat": 24.876418, "lng": 67.013203 },
      { "lat": 24.877063, "lng": 67.012575 },
      { "lat": 24.877498, "lng": 67.014582 },
      { "lat": 24.879568, "lng": 67.017405 },
      { "lat": 24.87679, "lng": 67.02084 },
      { "lat": 24.873532, "lng": 67.022819 },
      { "lat": 24.871532, "lng": 67.021886 },
      { "lat": 24.865235, "lng": 67.024867 },
      { "lat": 24.867436, "lng": 67.028083 },
      { "lat": 24.86257, "lng": 67.030654 },
      { "lat": 24.861679, "lng": 67.034335 },
      { "lat": 24.860635, "lng": 67.034746 },
      { "lat": 24.857146, "lng": 67.033165 },
      { "lat": 24.856709, "lng": 67.031676 },
      { "lat": 24.845711, "lng": 67.037882 },
      { "lat": 24.84377, "lng": 67.041496 },
      { "lat": 24.839498, "lng": 67.033619 },
      { "lat": 24.839795, "lng": 67.030566 },
      { "lat": 24.835988, "lng": 67.026264 },
      { "lat": 24.834002, "lng": 67.023947 }
    ],
    GadapPath: [
      { "lat": 24.988545, "lng": 67.089842 },
      { "lat": 25.014098, "lng": 67.08304 },
      { "lat": 25.011648, "lng": 67.046369 },
      { "lat": 24.990684, "lng": 67.047806 },
      { "lat": 24.996694, "lng": 67.019171 },
      { "lat": 24.992386, "lng": 66.977731 },
      { "lat": 25.035345, "lng": 66.953406 },
      { "lat": 25.087605, "lng": 67.015745 },
      { "lat": 25.200428, "lng": 67.05069 },
      { "lat": 25.24143, "lng": 67.11022 },
      { "lat": 25.216275, "lng": 67.134149 },
      { "lat": 25.157557, "lng": 67.135127 },
      { "lat": 25.124457, "lng": 67.103343 },
      { "lat": 25.087695, "lng": 67.087452 },
      { "lat": 25.029187, "lng": 67.172546 },
      { "lat": 24.986542, "lng": 67.263502 },
      { "lat": 24.970816, "lng": 67.25422 },
      { "lat": 24.977424, "lng": 67.171473 },
      { "lat": 24.953806, "lng": 67.161685 },
      { "lat": 24.965497, "lng": 67.152157 },
      { "lat": 24.979433, "lng": 67.161812 },
      { "lat": 24.994025, "lng": 67.135225 },
      { "lat": 24.978604, "lng": 67.119185 },
      { "lat": 24.988631, "lng": 67.108762 },
      { "lat": 24.9887, "lng": 67.090786 }
    ],
    UthalPath: [
      { "lat": 25.647674, "lng": 66.891084 },
      { "lat": 25.622088, "lng": 66.555663 },
      { "lat": 25.537033, "lng": 66.450955 },
      { "lat": 25.629521, "lng": 66.378869 },
      { "lat": 25.608889, "lng": 66.240189 },
      { "lat": 25.561001, "lng": 66.142707 },
      { "lat": 25.483345, "lng": 66.100158 },
      { "lat": 25.527162, "lng": 66.33096 },
      { "lat": 25.46438, "lng": 66.51919 },
      { "lat": 25.406528, "lng": 66.49868 },
      { "lat": 25.467801, "lng": 66.369949 },
      { "lat": 25.46137, "lng": 66.192136 },
      { "lat": 25.425176, "lng": 66.03355 },
      { "lat": 25.418743, "lng": 65.874963 },
      { "lat": 25.390717, "lng": 65.748292 },
      { "lat": 25.35772, "lng": 65.643592 },
      { "lat": 25.395952, "lng": 65.434194 },
      { "lat": 25.387037, "lng": 65.296207 },
      { "lat": 25.356521, "lng": 65.221721 },
      { "lat": 25.594188, "lng": 65.207823 },
      { "lat": 25.608866, "lng": 65.305245 },
      { "lat": 25.638492, "lng": 65.41438 },
      { "lat": 25.708995, "lng": 65.522506 },
      { "lat": 25.551106, "lng": 65.540864 },
      { "lat": 25.407597, "lng": 65.51159 },
      { "lat": 25.476497, "lng": 65.584609 },
      { "lat": 25.51066, "lng": 65.734533 },
      { "lat": 25.5002, "lng": 65.887203 },
      { "lat": 25.467695, "lng": 66.034949 },
      { "lat": 25.709086, "lng": 66.185726 },
      { "lat": 25.883973, "lng": 66.252875 },
      { "lat": 25.66474, "lng": 66.260357 },
      { "lat": 25.847005, "lng": 66.341003 },
      { "lat": 25.947912, "lng": 66.252236 },
      { "lat": 26.164848, "lng": 66.192746 },
      { "lat": 26.174043, "lng": 66.30559 },
      { "lat": 26.089539, "lng": 66.4459 },
      { "lat": 26.098739, "lng": 66.534024 },
      { "lat": 26.22906, "lng": 66.652244 },
      { "lat": 26.244907, "lng": 66.766285 },
      { "lat": 25.951923, "lng": 66.883731 },
      { "lat": 25.658207, "lng": 66.9023 }
    ],
    OrangiPath: [
      { "lat": 24.953858, "lng": 67.024382 },
      { "lat": 24.957669, "lng": 67.020068 },
      { "lat": 24.949651, "lng": 67.012321 },
      { "lat": 24.95914, "lng": 67.001633 },
      { "lat": 24.995232, "lng": 66.996392 },
      { "lat": 25.01575, "lng": 66.977328 },
      { "lat": 24.995957, "lng": 66.953277 },
      { "lat": 24.978772, "lng": 66.964398 },
      { "lat": 24.985321, "lng": 66.976854 },
      { "lat": 24.958896, "lng": 66.978763 },
      { "lat": 24.953702, "lng": 66.966747 },
      { "lat": 24.917356, "lng": 67.000865 },
      { "lat": 24.931911, "lng": 67.014083 },
      { "lat": 24.952924, "lng": 67.024725 }
    ],
    JauharPath: [
      { "lat": 24.904553, "lng": 67.138015 },
      { "lat": 24.913328, "lng": 67.140794 },
      { "lat": 24.918727, "lng": 67.143128 },
      { "lat": 24.922102, "lng": 67.146492 },
      { "lat": 24.939025, "lng": 67.159947 },
      { "lat": 24.939559, "lng": 67.156474 },
      { "lat": 24.937981, "lng": 67.14764 },
      { "lat": 24.935602, "lng": 67.134949 },
      { "lat": 24.932524, "lng": 67.121915 },
      { "lat": 24.928199, "lng": 67.111285 },
      { "lat": 24.915805, "lng": 67.118544 },
      { "lat": 24.914991, "lng": 67.114737 },
      { "lat": 24.91379, "lng": 67.112059 },
      { "lat": 24.909288, "lng": 67.114685 },
      { "lat": 24.906704, "lng": 67.111911 },
      { "lat": 24.900992, "lng": 67.116578 },
      { "lat": 24.902413, "lng": 67.118274 },
      { "lat": 24.904514, "lng": 67.137843 }
    ],
    LyariPath: [
      { "lat": 24.871108, "lng": 66.976114 },
      { "lat": 24.878929, "lng": 66.993589 },
      { "lat": 24.880913, "lng": 67.004172 },
      { "lat": 24.87729, "lng": 67.012695 },
      { "lat": 24.876191, "lng": 67.013141 },
      { "lat": 24.866051, "lng": 67.002703 },
      { "lat": 24.864087, "lng": 67.002436 },
      { "lat": 24.859449, "lng": 67.000524 },
      { "lat": 24.857091, "lng": 66.999654 },
      { "lat": 24.855122, "lng": 66.998183 },
      { "lat": 24.851843, "lng": 66.9929 },
      { "lat": 24.85341, "lng": 66.991918 },
      { "lat": 24.854209, "lng": 66.987723 },
      { "lat": 24.858696, "lng": 66.986969 },
      { "lat": 24.863184, "lng": 66.986731 },
      { "lat": 24.86515, "lng": 66.985395 },
      { "lat": 24.871185, "lng": 66.976114 }
    ],
    SIMZPath: [
      { "lat": 24.871676, "lng": 66.975404 },
      { "lat": 24.879696, "lng": 66.993085 },
      { "lat": 24.882402, "lng": 67.009092 },
      { "lat": 24.880353, "lng": 67.014124 },
      { "lat": 24.885001, "lng": 67.020701 },
      { "lat": 24.890636, "lng": 67.021752 },
      { "lat": 24.907666, "lng": 67.01862 },
      { "lat": 24.927623, "lng": 67.019499 },
      { "lat": 24.930323, "lng": 67.017836 },
      { "lat": 24.923772, "lng": 67.009666 },
      { "lat": 24.922599, "lng": 67.010645 },
      { "lat": 24.917769, "lng": 67.004826 },
      { "lat": 24.919287, "lng": 67.003243 },
      { "lat": 24.917067, "lng": 66.998741 },
      { "lat": 24.919052, "lng": 66.993167 },
      { "lat": 24.914906, "lng": 66.986646 },
      { "lat": 24.916025, "lng": 66.98257 },
      { "lat": 24.912108, "lng": 66.979201 },
      { "lat": 24.910072, "lng": 66.98065 },
      { "lat": 24.907808, "lng": 66.978413 },
      { "lat": 24.908779, "lng": 66.977767 },
      { "lat": 24.899961, "lng": 66.96959 },
      { "lat": 24.89524, "lng": 66.973227 },
      { "lat": 24.891478, "lng": 66.979122 },
      { "lat": 24.889675, "lng": 66.974516 },
      { "lat": 24.888462, "lng": 66.970025 },
      { "lat": 24.882708, "lng": 66.968816 },
      { "lat": 24.877266, "lng": 66.964689 },
      { "lat": 24.87191, "lng": 66.974631 }
    ]
  };

  pathsArray: google.maps.LatLngLiteral[][] = Object.values(this.paths);























  zoomOnHoverOptions: ZoomOnHoverOptions = {

    
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 0.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2 // Zoom will take affect after 0.8 seconds
  };
  options: CloudOptions = {
    width: 400,
    height: 400,
    overflow: false,
  };
  wordcloudData: any[] = []
  data: any[] = []
  startDate = ''
  endDate = ''
  InboundGraph: any
  AudienceEngagmentGraph: any
  regionWiseGraph: any
  EnagementGraph: any
  sentimentGraph: any
  facebookreactionGraph: any
  maxEndDate: any;
  social_media_report: any
  inbound_traffic: any
  InboundCounts: any[] = []
  countriesmap:any
  InboundDates: any[] = []
  sentimental_analysis: any
  date_Audience: any[] = []
  post_likes: any
  post_comments: any
  post_share: any
  regionwiseReportData: any
  facebook_reaction: any[] = []
  facebook_reactionDates: any[] = []
  platformsArray: any[] = []
  channelWiseEngagement: any[] = [];
  regionwiseCount: any[] = []
  regionwiseArray: any[] = []
  executiveDashborad:any
  str:any=''
  currentDate: any;
  isShowEngagementGraph: boolean = false
  isShowSentimentGraph: boolean = false
  isShowAudienceEngagementGraph: boolean = false
  isShowInboundGraph: boolean = false
  isShowfacebookreations: boolean = false
  isShowReginwiseGraph: boolean = false

  constructor(private _hS: HeaderService,
    private commonDataService: CommonDataService,
    private spinerService: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    const newObj = { title: 'Executive Dashboard', url: '/analytics/executive-dashboard' };
    this._hS.setHeader(newObj);
    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split("T")[0];
    this.GetAllSocialMediaReport()
    this.makeChartResponsive();
    this.getWordCloud()

    // this.GetAllRegionWiseData()
  }

  GetAllRegionWiseData() {


    let obj = {
      toDate: this.endDate,
      fromDate: this.startDate,
      companyId: 0
    }

    this.regionwiseArray = []
    this.regionwiseCount = []
    this.isShowEngagementGraph = false
    this.isShowSentimentGraph = false
    this.isShowAudienceEngagementGraph = false
    this.isShowInboundGraph = false
    this.isShowfacebookreations = false
    this.isShowReginwiseGraph = false
    this.commonDataService.GetRegionWiseReport(obj).subscribe((res: any) => {

      this.regionwiseReportData = res
  if(this.regionwiseReportData.length==0){
    this.isShowReginwiseGraph=true
  }
      this.regionwiseReportData.forEach((x: any) => {
        if (!this.regionwiseArray.includes((x.region))) {
          this.regionwiseArray.push(x.region)
        }
       
        this.regionwiseCount.push(x.totalCount)
        this.getRegionWiseTrafic()
      })

      console.log("this.regionwiseReportData==>", this.regionwiseReportData)
    })

  }
  GetAllSocialMediaReport() {
    if (this.startDate == "" && this.endDate == "") {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, "YYYY-MM-dd") || '';
      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 6);
      this.startDate = this.datePipe.transform(prevDate, "YYYY-MM-dd") || '';
    }
    else if (this.startDate != "" && this.endDate != ""
    ) {
      this.startDate = this.startDate
      this.endDate = this.endDate
    }
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      alert('Select a date range of 30 days or less');
      this.endDate=''
      return;
    }
    const requestData = {
      pageId: "622038187854126",
      from: this.startDate,
      to: this.endDate,
    };

    if (this.startDate <= this.endDate) {
      this.inbound_traffic = []
      this.sentimental_analysis = []
      this.date_Audience = []
      this.post_comments = []
      this.post_likes = []
      this.InboundDates = []
      this.facebook_reactionDates = []
      this.post_share = []
      this.facebook_reaction = [];
      this.platformsArray = [];
      this.channelWiseEngagement=[]
      this.isShowEngagementGraph = false
      this.isShowSentimentGraph = false
      this.isShowAudienceEngagementGraph = false
      this.isShowInboundGraph = false
      this.isShowfacebookreations = false
      this.isShowReginwiseGraph = false
   this.str=''
      this.spinerService.show()
      this.cd.detectChanges()
      this.commonDataService.GetAllSocialMatrics(requestData).subscribe((res: any) => {
        
        this.social_media_report = res
        this.spinerService.hide()
        // for show likes comments share 
        this.executiveDashborad=res.facebookReportResponseDto

        // inbound 
        const inBoundTrafficDto = this.social_media_report.inBoundTrafficDto;
        inBoundTrafficDto.forEach((data: any) => {
          if (!this.InboundDates.includes(this.datePipe.transform(data.date, 'dd/MMM'))) {
            this.InboundDates.push(this.datePipe.transform(data.date, 'dd/MMM'))
          }
      
          this.InboundCounts.push(data.totalCount)
        });
           if(this.InboundDates.length==0){
            this.isShowInboundGraph=true
           }
        // sentiments
        const sentimentsAnalysisDto = this.social_media_report.sentimentsAnalysisDto;
    if(sentimentsAnalysisDto.length==0){
     this.isShowSentimentGraph=true
    }
        sentimentsAnalysisDto.forEach((data: any) => {
          const sentimentName = data.sentimentName;
          this.str= sentimentName.toLowerCase().split(/[-_.\s]/).map((w:any) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`).join(' ');
          const totalSentiments = data.totalSentiments;
     
          this.sentimental_analysis.push({ name: this.str, value: totalSentiments });
        });
        // Audience Chart

        this.social_media_report.facebookReportResponseDto.postLikeSpan?.forEach((data: any) => {

          this.post_likes.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postShareSpan?.forEach((data: any) => {
          this.post_share.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
        this.social_media_report.facebookReportResponseDto.postCommentSpan?.forEach((data: any) => {
          this.post_comments.push(data.activityCount);
          if (!this.date_Audience.includes(this.datePipe.transform(data.dateValue, 'dd/MMM'))) {
            this.date_Audience.push(this.datePipe.transform(data.dateValue, 'dd/MMM'))
          }
        });
   if(this.date_Audience.length==0){
    this.isShowAudienceEngagementGraph=true
   }
        // facebook Reaction 
        const pageReactionsSpan = this.social_media_report.facebookReportResponseDto.pageReactionsSpan;

        pageReactionsSpan?.forEach((data: any) => {

          this.facebook_reaction.push(data.like + data.love + data.wow + data.haha + data.sorry + data.anger + data.sad + data.tHANKFUL + data.pride + data.cARE);

          if (!this.facebook_reactionDates.includes(this.datePipe.transform(data.totalReactionsDateValue, 'dd/MMM'))) {
            this.facebook_reactionDates.push(this.datePipe.transform(data.totalReactionsDateValue, 'dd/MMM'))
            
          }
        });
     
     if(this.facebook_reactionDates.length==0){
    this.isShowfacebookreations=true
     }
        //getEnagementChart
        const channelWiseDto = this.social_media_report.channelWiseDto;

        channelWiseDto.forEach((channel: any) => {
          if (!this.platformsArray.includes(channel.platform)) {
            this.platformsArray.push(channel.platform);
          }

          channel.dateWise.forEach((tag: any) => {
            const date = new Date(tag.date).toISOString().split('T')[0];
            const totalCount = tag.totalCount;
            const existingNameCount = this.channelWiseEngagement.find((n) => n.name === date);

            if (existingNameCount) {
              existingNameCount.data.push(totalCount);
            } else {
              this.channelWiseEngagement.push({
                type: 'bar',
                name: date,
                data: [totalCount],
              });
            }
          });
        });
    if(this.platformsArray.length==0){
      this.isShowEngagementGraph=true
    }
        this.getEnagementChart();
        this.getChartInbound()
        this.getSentimentChart()
        this.getChartAudienceEngagement()
        this.getFacebookReaction()

      })

    } else {
      alert('select end date greater then start date')
    }

    this.GetAllRegionWiseData()


  }

  getChartInbound() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('inbound')!;
    this.InboundGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#FFA800',],

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Inbound'],
        bottom: 0,
        icon: 'circle'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.InboundDates,
          axisLabel: {
            rotate: 45
          }
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Inbounds",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          name: 'Inbound',
          type: 'line',

          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FFA800'
              },
              {
                offset: 1,
                color: '#FFD178'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.InboundCounts
        },
      ],
      markPoint: {
        data: [{
          type: "max"
        }],
        symbol: "pin"
      }
    };
    // option = {
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['Inbound']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: this.inbound_traffic.map((item: any) => dataFormat(item.x)),
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: 'Email',
    //       type: 'line',

    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: this.inbound_traffic.map((item: any) => item.y),
    //     },


    //   ]
    // };

    option && this.InboundGraph.setOption(option);
  }
  getChartAudienceEngagement() {

    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('audience')!;
    this.AudienceEngagmentGraph = echarts.init(chartDom);
    var option: EChartsOption;


    option = {
      color: ['#0095FF', '#FF0000', '#05C283', '#FF0087', '#FFBF00'],

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Likes', 'Comments', 'Share'],
        icon: 'circle',
        bottom: 0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date_Audience.sort((a,b) =>  new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            rotate: 45,
          },
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Number of  Audience Enagements",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          name: 'Likes',
          type: 'line',

          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0095FF'
              },
              {
                offset: 1,
                color: '#B7E5FA'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.post_likes
        },
        {
          name: 'Comments',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FF0000'
              },
              {
                offset: 1,
                color: '#CDA2B1'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.post_comments
        },
        {
          name: 'Share',
          type: 'line',

          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#05C283'
              },
              {
                offset: 1,
                color: '#10CB8D'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.post_share
        },

      ]
    };

    option && this.AudienceEngagmentGraph.setOption(option);
  }
  getEnagementChart() {
    var chartDom = document.getElementById('enagement');
    this.EnagementGraph = echarts.init(chartDom);
    var option;

    option = {
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'circle'
      },
      tooltip: { trigger: 'axis' },
      dataset: {
        source: [['product', ...this.platformsArray], ...this.channelWiseEngagement.map(data => [data.name, ...data.data])],
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.channelWiseEngagement.map(data => data.name),

          axisLabel: {
            rotate: 45,
            formatter: function (value: any) {
              return new Date(value).toISOString().split('T')[0];
            },

          },
        },
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of  Engagements ",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: this.platformsArray.map(platform => ({
        type: 'bar',
        name: platform,
        encode: { x: 'product', y: platform },
      })),
    };
    option && this.EnagementGraph.setOption(option);
  }
  getSentimentChart() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    this.sentimentGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        left: 'center',
        bottom: 'bottom',
        icon: 'circle',

      },
      series: [
        {
          name: 'Sentiments Analysis',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.sentimental_analysis,
        },
        
      ],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
    };

    option && this.sentimentGraph.setOption(option);
  }
  getFacebookReaction() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('facebookReaction')!;
    this.facebookreactionGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      color: ['#189FFF',],

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['FACEBOOK REACTIONS'],
        icon: 'circle',
        bottom: 0
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.facebook_reactionDates.sort((a,b) =>  new Date(b).getTime() - new Date(a).getTime()).reverse(),
          axisLabel: {
            rotate: 45
          }
        }
      ],
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Facebook reactions",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          name: 'FACEBOOK REACTIONS',
          type: 'line',

          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#189FFF'
              },
              {
                offset: 1,
                color: '#82CBFF'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.facebook_reaction
        }
      ]
    };

    option && this.facebookreactionGraph.setOption(option);
  }

  getRegionWiseTrafic() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('regionWiseTrafic')!;
    this.regionWiseGraph = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: this.regionwiseArray,
        axisLabel: {
          rotate: 45
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '13%',
        right: '4%',
        bottom: '13%',
        containLabel: true
      },
      yAxis: [{
        type: "value",
        nameLocation: "middle",
        name: "Numbers of Regionwise traffic counts",
        nameTextStyle: {
          fontSize: 12,
          color: 'Gray',
          lineHeight: 50

        }
      }],
      series: [
        {
          data: this.regionwiseCount,
          type: 'bar',
          itemStyle: {
            borderRadius: 5,
          }
        }
      ]

    };

    option && this.regionWiseGraph.setOption(option);

  }
  isMediaActive: boolean = false;
  toggleMediaTab() {
    this.isMediaActive = !this.isMediaActive;
  }
  resetEndDate() {
    this.endDate = "";
  }
  getWordCloud() {
debugger
    if (this.endDate == '' && this.startDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 8);
      this.startDate = this.datePipe.transform(prevDate, 'MM-dd-YYYY') || "";
      this.endDate = this.datePipe.transform(new Date(), 'MM-dd-YYYY') || "";
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.datePipe.transform(this.startDate, 'MM-dd-YYYY') || "";
      this.endDate = this.datePipe.transform(this.endDate, 'MM-dd-YYYY') || "";
    }
    this.data = []
    let obj={
    
        "searchQuery": {
            "FromDate": "08-01-2023",
            "ToDate": "08-10-2023",
            "QueryTime": "",
            "TypeId": "",
            "KeyWords": "",
            "CategoryIds": "",
            "AuthorCategoryIds": "",
            "SentimentIds": "",
            "GenderIds": "",
            "AgeIds": "",
            "CityIds": "",
            "PageIds": "",
            "ExcPageIds": "",
            "NetworkIds": "",
            "IsImportantIds": "",
            "BrandIds": "",
            "CountryIds": "",
            "Location": "",
            "SearchType": "",
            "LanguageIds": "",
            "Networks": [],
            "SearchTypeText": "",
            "SentimentText": "",
            "LanguageText": "",
            "BrandText": "",
            "NetworkText": "",
            "IsImpText": "",
            "CategoryText": "",
            "GenderText": "",
            "PageText": "",
            "AuthorCategoryText": "",
            "ExcPageText": "",
            "IsKEKW": "0"
        }
    
    }
    this.commonDataService.GetwordCloud(obj).subscribe((res: any) => {
      debugger
      this.wordcloudData = res
console.log("WordCloud===>",res)
      if (this.wordcloudData.length > 0) {
        this.data = [];
        res.forEach((element: any) => {
          var obj = {
            text: element.Term,
            weight: element.frequency
          };
          this.data.push(obj);
        });

      }

      console.log('Term: ', this.data);

    });
    //     this.wordcloudData.forEach((x:any)=>{
    //       this.data.push({text:x.Term, weight:x.frequency})
    //     })
    //     this.data= [{

    // color:  "#c90296",
    // text: "کے الیکٹرک",
    // weight : 28

    //  },
    //  {

    //   color:  "#c90296",
    //   text: "کے الیکٹرک",
    //   weight : 78

    //    },
    // ]
    //   console.log("WordCloud===>",this.data)


  }
  testGraph() {
    var chartDom = document.getElementById('test');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Gradient Stacked Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    };

    option && myChart.setOption(option);
  }
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.InboundGraph) {
        this.InboundGraph.resize();
      }
      if (this.AudienceEngagmentGraph) {
        this.AudienceEngagmentGraph.resize();
      }
      if (this.EnagementGraph) {
        this.EnagementGraph.resize();
      }
      if (this.sentimentGraph) {
        this.sentimentGraph.resize();
      }
      if (this.facebookreactionGraph) {
        this.facebookreactionGraph.resize();
      }
      if (this.regionWiseGraph) {
        this.regionWiseGraph.resize()
      }

    });
  }
 
}
