//
//  JJTabBarViewController.m
//  TacgegraphCar
//
//  Created by 刘毅 on 2017/7/26.
//  Copyright © 2017年 vpjacob. All rights reserved.
//

#import "JJTabBarViewController.h"
#import "JJHtmlListener.h"
#import "SelsectViedoViewController.h"
//#import "ViewController.h"
#import "MyNaviController.h"
//#import "UZAppUtils.h"


@interface JJTabBarViewController ()

@end

@implementation JJTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    SelsectViedoViewController *vc = [[SelsectViedoViewController alloc] init];
    UIViewController *h5VC = [[JJHtmlListener manager] getAPIWidgetContainer];
    self.viewControllers = @[vc,h5VC];
    vc.title = @"趣味视频";
    h5VC.title = @"行车记录仪";
    
    
}




- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
