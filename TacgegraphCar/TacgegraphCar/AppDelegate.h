//
//  AppDelegate.h
//  TacgegraphCar
//
//  Created by 刘毅 on 2017/7/18.
//  Copyright © 2017年 vpjacob. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JJTabBarViewController.h"
#import "JJNavigationController.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property(nonatomic,strong)JJNavigationController *nav;
@property(nonatomic,strong)JJTabBarViewController *tabBar;
@end

