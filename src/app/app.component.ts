import { Component } from '@angular/core'
import { AuthenticationService } from './authentication.service'
import { DataAccessService } from './data-access.service'
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'playground2'
  showTable = false
  public gridData: any[] = []

  private auth: AuthenticationService = new AuthenticationService
  private dataService: DataAccessService = new DataAccessService(this.auth)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  })

  get f() {
    return this.form.controls
  }

  async submit() {
    this.auth.login(this.form.value.email, this.form.value.password).then(async authenticated => {
      if (!authenticated) {
        Swal.fire('Wrong email or password!')
        return
      }

      this.showTable = true

      const orderList = await this.dataService.orderList() as any

      await orderList.map(async (d: any) => {
        const orders = await this.dataService.orderDetails(d.id) as any
        const total = orders.reduce((accumulator: any, current: any) => accumulator + current.quantity, 0)

        this.gridData.push({
          name: d.buyerFullName,
          status: d.status,
          total: total
        })
      })

      Swal.hideLoading()
    })
  }
}
