import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';
import { AddressList } from '../../../../types/address-list';
import { prepareAddressList } from '../../../../utils/prepare-address-list';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges {

  addressListToDisplay: IAddressToDisplay[] = [];

  @Input({ required: true }) userAddressList: AddressList | undefined = [];

  ngOnChanges(changes: SimpleChanges) {
    const ADDRESS_LIST_LOADED = Array.isArray(changes['userAddressList'].currentValue);

    if (ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }
  prepareAddressListToDisplay() {
    this.addressListToDisplay = [];

    const originalUserAddressList = this.userAddressList && this.userAddressList.length > 0 ? this.userAddressList : [];

    prepareAddressList(originalUserAddressList, true, (address) => {
      this.addressListToDisplay.push(address);
    });
  }
}
