/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

angular.module('myDashboardApp')
//

.config(function($translateProvider) {
    $translateProvider
    //
    .translations('fa', {
	'Dashboard': 'داشبور',
	'Applications': 'نرم‌افزارها',
	'Account': 'حساب کاربری',
	'Profile': 'پروفایل‌ها',
	'User management': 'مدیریت کاربران',
	'User': 'کاربر',
	'Users': 'کاربران',
	'Groups': 'گروه‌ها',
	'Roles': 'نقش‌ها',
	'Problems': 'مشکلات',
	'Zones': 'منطقه‌ها',
	'Networks': 'شبکه‌ها',
	'Devices': 'دستگاه‌ها',
	'Model': 'مدل',
	'Color': 'رنگ',
	'Workshops': 'کارگاه‌ها',
	'Requests': 'تقاضاها',
	'Actions': 'اکشن‌ها',
	'Tenant': 'ملک',
	'Input value': 'مقدار ورودی',
	
	'ID': 'شناسه',
	'Login': 'لاگین',
	'EMail': 'پست الکترونیکی',
	'Edit': 'ویرایش',
	'Save': 'ذخیره',
	'Cancel': 'انصراف',
	'Restore': 'بازیابی',
	'Password': 'گذرواژه',
	'Confirm': 'تایید',
	
	'Summary': 'خلاصه',
	'Phone': 'شماره تماس',
	'Mobile': 'شماره همراه',
	'LinkedId': 'لینکدین',
	'Telegram': 'تلگرام',
	'Whatsapp': 'واتساپ',
	'Contacts': 'تماس‌ها',
	'User avatar': 'اواتار کاربری',
	'Socials': 'شبکه‌های اجتمائی',
	
	'spas': 'نرم‌افزارها',
	
	'CMS': 'سیستم مدیریت محتوی',
	'Contents': 'محتوی‌ها',
	
	'Bank gates': 'درگاه‌های بانکی',
	
	'Settings': 'تنظیمات',
	'Setting' : 'تنظیم',
	
	'Theme': 'نمایه',
	'Themes': 'نمایه‌ها',
	'default':'پیش فرض',
	'gray': 'خاکستری',
	'red': 'قرمز',
	'dark': 'تیره',
	
	'Local': 'منطقه',
	'Language': 'زبان',
	'Direction': 'جهت',
	'Right to left': 'راست به چپ',
	'Left to right': 'چپ به راست',
	
	'Search': 'جستجو',
	
	'Persian': 'فارسی',
	'English': 'انگلیسی',
	'Enable navbar': 'فعال کردن نوار ابزار',
	
	'Messages': 'پیام‌ها',
	'message': 'پیام',
	'set zone': 'تعیین منطقه',
	'set fixer': 'تعیین تعمیرکار',
	'remote consultant': 'مشاوره تلفنی',
	'incomplete info': 'اطلاعات ناقص',
	'schadule': 'تعیین زمان و مکان',
	'fixed': 'تعمیر شد',
	'impossilbe to fix': 'تعمییر ممکن نیست',
	'set workshop': 'تعیین کارگاه',
	'accept': 'دریافت گوشی',
	'start to fix': 'آغاز تعمیر',
	'need more time': 'نیاز به زمان بیشتر',
	'give back': 'ارسال به مشتری',
	'close': 'بستن',
	'reopen': 'باز کردن',
	'archive': 'بایگانی',
	'report': 'گزارش',
	
	'app.update.message': 'نسخه جدید نصب شده است، دوباره لود کنید.',
    });
    $translateProvider.preferredLanguage('fa');
});
